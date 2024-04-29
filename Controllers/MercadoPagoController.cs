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

namespace Escolapios.Controllers;

[ApiController]
[Route("/api/v1/[controller]")]
public class MercadoPagoController(IOptions<AppSettings> appSettings, AppDBContext context, IMailService mailService, IMercadoPagoService mpService) : ControllerBase
{
  private readonly AppSettings _appSettings = appSettings.Value;
  private readonly AppDBContext _context = context;
  private readonly IMailService _mailService = mailService;
  private readonly IMercadoPagoService _mpService = mpService;

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
        Items = [
        new ()
        {
            Title = "Inscripción",
            Quantity = 1,
            CurrencyId = "ARS",
            UnitPrice = _appSettings.RegistrationFee,
        },],
        NotificationUrl = _appSettings.NotificationUrl,
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

      formData.Metadata = new Dictionary<string, object>() { { "paymentMethod", paymentMethod }, { "cardholderName", cardholderName }, { "lastFourDigits", lastFourDigits }, { "FirstName", request.firstName }, { "LastName", request.lastName }, { "DNI", request.DNI } };
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
  public async Task<IActionResult> Webhook(PaymentNotificationDto test)
  {
    try
    {
      var isValidSignature = _mpService.VerifySignature(Request);

      if (!isValidSignature) return BadRequest("HMAC verification failed");


      MercadoPagoConfig.AccessToken = _appSettings.MPAccessToken;
      var PaymentClient = new PaymentClient();
      Payment paymentFromMP = await PaymentClient.GetAsync(test.Data.Id);
      if (paymentFromMP == null) return BadRequest("Invalid 'test.Data.Id)'");

      var paymentData = new AppContext.Models.Payment
      {
        PaymentId = paymentFromMP.Id,
        FirstName = _mpService.GetDictionaryData("first_name", paymentFromMP.Metadata) ?? "",
        LastName = _mpService.GetDictionaryData("last_name", paymentFromMP.Metadata) ?? "",
        IdentificationNumber = _mpService.GetLongData("dni", paymentFromMP.Metadata),
        paymentStatus = paymentFromMP.Status,
      };

      _context.PaymentTable.Add(paymentData);
      _context.SaveChanges();

      var Subject = "Informacion Congreso de Educación Humanista";

      var Body = $@"
            <html>
            <body>
                <h1>Hola {paymentFromMP.Card.Cardholder.Name}</h1>
                <p>Estamos encantados de que hayas decidido sumarte al <i>'Congreso de Educación Humanista'</i>.</p>
                <p>Tu pago está en estado: <b>{paymentFromMP.Status}</b></p>
            </body>
            </html>";

      _mailService.SendEmail(paymentFromMP.Payer.Email, Subject, Body);

      return Ok();
    }
    catch (Exception ex)
    {
      return StatusCode(500, ex.Message);
    }

  }

  [HttpGet("user/{dni}")]
  public IActionResult GetByDNI(long dni)
  {
    try
    {
      var userInfo = (from payInfo in _context.PaymentTable where payInfo.IdentificationNumber == dni select payInfo).ToList();

      return Ok(userInfo);

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



