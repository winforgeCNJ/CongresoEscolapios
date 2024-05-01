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

  [HttpGet("create")]
  public IActionResult CreatePreferences()
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
        // Metadata = n new Dictionary<string, object>() { { "paymentMethod", paymentMethod }, { "cardholderName", cardholderName }, { "lastFourDigits", lastFourDigits }, { "FirstName", request.firstName }, { "LastName", request.lastName }, { "DNI", request.DNI } };
      };


      PreferenceClient client = new();
      Preference preference = client.Create(request);


      return Ok(preference);

    }

    catch (Exception ex)
    {

      return StatusCode(500, ex);
    }

  }

  [HttpPost("pay")]
  public async Task<IActionResult> Payment(PayRequestDTO request)
  {
    try
    {
      var formData = request.formData;
      var paymentMethod = request.paymentMethod;
      var cardholderName = request.cardholderName;
      var lastFourDigits = request.lastFourDigits;

      MercadoPagoConfig.AccessToken = _appSettings.MPAccessToken;
      formData.TransactionAmount = _appSettings.RegistrationFee;
      formData.NotificationUrl = _appSettings.NotificationUrl;

      formData.Metadata = new Dictionary<string, object>() {
          { "paymentMethod", paymentMethod },
          { "cardholderName", cardholderName },
          { "lastFourDigits", lastFourDigits },
          { "FirstName", request.firstName },
          { "LastName", request.lastName },
          { "DNI", request.DNI }
        };

      formData.Payer.FirstName = cardholderName;

      var client = new PaymentClient();
      Payment payment = await client.CreateAsync(formData);
      return Ok(new { payment, client });
    }
    catch (Exception ex)
    {
      return StatusCode(500, ex.Message);
    }

  }

  [HttpPost("webhook")]
  public async Task<IActionResult> Webhook(PaymentNotificationDto WebhookReq)
  {
    try
    {
      // var isValidSignature = _mpService.VerifySignature(Request);

      // if (!isValidSignature) return BadRequest("HMAC verification failed");


      MercadoPagoConfig.AccessToken = _appSettings.MPAccessToken;
      var PaymentClient = new PaymentClient();
      Payment paymentFromMP = await PaymentClient.GetAsync(WebhookReq.Data.Id);
      if (paymentFromMP == null) return BadRequest("Invalid 'WebhookReq.Data.Id)'");

      var paymentData = new AppContext.Models.Payment
      {
        PaymentId = paymentFromMP.Id ?? 0,
        FirstName = _mpService.GetDictionaryData("first_name", paymentFromMP.Metadata) ?? "Testeando",
        LastName = _mpService.GetDictionaryData("last_name", paymentFromMP.Metadata) ?? "Test",
        IdentificationNumber = _mpService.GetLongData("dni", paymentFromMP.Metadata),
        paymentStatus = paymentFromMP.Status,
      };

      _context.PaymentTable.Add(paymentData);
      _context.SaveChanges();

      // if (paymentFromMP.Status == PaymentStatus.Approved || paymentFromMP.Status == PaymentStatus.Rejected)
      // {

      //   var Subject = "Informacion Congreso de Educación Humanista";
      //   var Body = $@"
      //       <html>
      //       <body>
      //           <h4>Hola {paymentFromMP.Card.Cardholder.Name}</h4>
      //           <p>Estamos encantados de que hayas decidido sumarte al <i>'Congreso de Educación Humanista'</i>.</p>
      //           <p>Tu pago está en estado: <b>{paymentFromMP.Status}</b></p>
      //       </body>
      //       </html>";

      //   _mailService.SendEmail(paymentFromMP.Payer.Email, Subject, Body);
      // }

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


      var paymentGroups = (from payInfo in _context.PaymentTable
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

  [HttpGet("cofig")]
  public IActionResult GetEnvs()
  {
    return Ok(_appSettings);

  }


  [HttpGet("csv")]
  public IActionResult GetFile()
  {
    try
    {
      // Obtiene los datos de la base de datos
      var usersInfo = (from payInfo in _context.PaymentTable
                       where payInfo.paymentStatus == PaymentStatus.Approved
                       select payInfo).ToList();

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



