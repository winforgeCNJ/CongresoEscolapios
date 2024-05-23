using Microsoft.AspNetCore.Mvc;
using MercadoPago.Client.Preference;
using MercadoPago.Config;
using MercadoPago.Resource.Preference;
using MercadoPago.Client.Payment;
using MercadoPago.Resource.Payment;
using DTO;
using Microsoft.Extensions.Options;
using AppContext;
using Services;
using System.Text;
using System.Reflection;
using Helpers;
using AppContext.Models;

namespace Escolapios.Controllers;

[ApiController]
[Route("/api/v1/[controller]")]
public class MercadoPagoController : ControllerBase
{
  private AppSettings _appSettings { get; set; }
  private AppDBContext _context { get; set; }
  private IMailService _mailService { get; set; }
  private IMercadoPagoService _mpService { get; set; }


  public MercadoPagoController(IOptions<AppSettings> appSettings, AppDBContext context, IMailService mailService, IMercadoPagoService mpService)
  {
    _appSettings = appSettings.Value;
    _context = context;
    _mailService = mailService;
    _mpService = mpService;
  }

  [HttpPost("createPreference")]
  public IActionResult CreatePreferences(DTOPreferenceReq preferenceReq)
  {

    try
    {
      MercadoPagoConfig.AccessToken = _appSettings.MPAccessToken;

      PreferenceRequest request = new()
      {
        // el Purpose = 'wallet_purchase', solo permite pagos registrados
        // para permitir pagos de invitados, puede omitir esta propiedad
        Purpose = "wallet_purchase",
        Items = new List<PreferenceItemRequest>
        {
          new(){
                  Title = "Inscripción",
                  Quantity = 1,
                  CurrencyId = "ARS",
                  UnitPrice = _appSettings.RegistrationFee,
                }
        },
        NotificationUrl = _appSettings.NotificationUrl,
        Metadata = new Dictionary<string, object>() {
          { "FirstName", preferenceReq.firstName },
          { "LastName", preferenceReq.lastName },
          { "DNI", preferenceReq.DNI },
          { "phoneNumber", preferenceReq.phoneNumber },
          { "mail", preferenceReq.mail }
        }
      };

      PreferenceClient client = new();
      Preference preference = client.Create(request);


      return Ok(new { preferenceId = preference.Id });

    }

    catch (Exception ex)
    {

      return StatusCode(500, ex);
    }

  }

  [HttpPost("payment")]
  public async Task<IActionResult> Payment(DTOPaymentReq request)
  {
    try
    {

      var formData = request.formData;
      var paymentMethod = request.paymentMethod;
      var cardholderName = request.cardholderName;
      var lastFourDigits = request.lastFourDigits;

      var Metadata = new Dictionary<string, object>() {
          { "paymentMethod", paymentMethod },
          { "cardholderName", cardholderName },
          { "lastFourDigits", lastFourDigits },
          { "FirstName", request.firstName },
          { "LastName", request.lastName },
          { "DNI", request.DNI },
          { "phoneNumber", request.phoneNumber },
          { "mail", request.mail }
        };


      var newprePayment = new PrePayment
      {
        FirstName = request.firstName,
        LastName = request.lastName,
        IdentificationNumber = request.DNI,
        PhoneNumber = request.phoneNumber,
        Mail = request.mail,
        PaymentMethodId = request.formData?.PaymentMethodId ?? "wallet_purchase",
        PaymentMethod = request.paymentMethod
      };
      _context.PrePayment.Add(newprePayment);
      _context.SaveChanges();

      if (request.formData?.PaymentMethodId == "wallet_purchase")
        return Ok();
      if (request.formData == null) return Ok();
      if (formData == null) return Ok();


      MercadoPagoConfig.AccessToken = _appSettings.MPAccessToken;
      formData.TransactionAmount = _appSettings.RegistrationFee;
      formData.NotificationUrl = _appSettings.NotificationUrl;

      formData.Metadata = Metadata;
      formData.Payer.FirstName = cardholderName;

      var client = new PaymentClient();
      Payment payment = await client.CreateAsync(formData);

      if (payment.Status != PaymentStatus.Approved) return BadRequest($"Invalid Card Info: Status {payment.Status}");

      return Ok(new { payment, client });
    }
    catch (Exception ex)
    {
      return StatusCode(500, ex.Message);
    }

  }

  [HttpPost("webhook")]
  public async Task<IActionResult> Webhook(DTOWebhookReq WebhookReq)
  {
    try
    {

      MercadoPagoConfig.AccessToken = _appSettings.MPAccessToken;
      var PaymentClient = new PaymentClient();
      Payment paymentFromMP = await PaymentClient.GetAsync(WebhookReq.Data.Id);
      if (paymentFromMP == null) return BadRequest("Invalid 'WebhookReq.Data.Id)'");

      var paymentData = new AppContext.Models.PaymentTable
      {
        PaymentId = paymentFromMP.Id ?? 0,
        FirstName = _mpService.GetDictionaryData("first_name", paymentFromMP.Metadata) ?? "",
        LastName = _mpService.GetDictionaryData("last_name", paymentFromMP.Metadata) ?? "",
        IdentificationNumber = _mpService.GetLongData("dni", paymentFromMP.Metadata),
        PhoneNumber = _mpService.GetDictionaryData("phone_number", paymentFromMP.Metadata) ?? "",
        Mail = _mpService.GetDictionaryData("mail", paymentFromMP.Metadata) ?? "",
        paymentStatus = paymentFromMP.Status,
        NotificationId = WebhookReq.Id,
      };

      _context.Payment.Add(paymentData);
      _context.SaveChanges();

      return Ok();
    }
    catch (Exception ex)
    {
      return StatusCode(500, ex.Message);
    }

  }

  [HttpGet("user/{dni}")]
  public async Task<IActionResult> GetByDNI(long dni)
  {
    try
    {
      MercadoPagoConfig.AccessToken = _appSettings.MPAccessToken;


      var paymentGroups = (from payInfo in _context.Payment
                           where payInfo.IdentificationNumber == dni
                           group payInfo by payInfo.PaymentId into grouped
                           select new PaymentGroupInfo
                           {
                             PaymentId = grouped.Key,
                             Payments = grouped.ToList(),
                             PaymentInfoMP = new Payment(),
                           }).ToList();

      // Luego, procesa cada grupo para obtener la información adicional asincrónicamente
      var PaymentClient = new PaymentClient();
      var tasks = paymentGroups.Select(async group =>
     {
       group.PaymentInfoMP = await PaymentClient.GetAsync(group.PaymentId);
       return group;  // Devuelve el grupo actualizado
     });

      var updatedGroups = await Task.WhenAll(tasks);  // Espera que todas las tareas completen

      // Opcional: Manejar los grupos actualizados aquí


      return Ok(updatedGroups);

    }

    catch (Exception ex)
    {

      return StatusCode(500, ex);
    }

  }

  [HttpGet("csv")]
  public IActionResult GetFile()
  {
    try
    {
      // Obtiene los datos de la base de datos
      var usersInfo = (from payInfo in _context.Payment
                       where payInfo.paymentStatus == PaymentStatus.Approved
                       group payInfo by payInfo.NotificationId into grouped
                       select grouped.First()).ToList();
      // Verifica si hay datos
      if (usersInfo == null || usersInfo.Count == 0)
      {
        return NotFound("No records found.");
      }

      var csv = new StringBuilder();

      // Usar reflexión para obtener las propiedades del primer elemento (asumiendo que todos los elementos son del mismo tipo)
      PropertyInfo[] properties = usersInfo.First().GetType().GetProperties();

      // Construir la cabecera del CSV con los nombres de las propiedades
      csv.AppendLine(string.Join(";", properties.Select(p => p.Name)));

      // Añadir las filas de datos
      foreach (var user in usersInfo)
      {
        var line = string.Join(";", properties.Select(p => p.GetValue(user, null)?.ToString().Replace(';', ',')));
        csv.AppendLine(line);
      }

      return File(Encoding.UTF8.GetBytes(csv.ToString()), "text/csv", "UserInfo.csv");
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Internal server error: {ex.Message}");
    }

  }


}



