using Microsoft.AspNetCore.Mvc;
using MercadoPago.Client.Preference;
using MercadoPago.Config;
using MercadoPago.Resource.Preference;
using MercadoPago.Client.Payment;
using MercadoPago.Resource.Payment;
using DTO;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using AppContext;

namespace Escolapios.Controllers;

[ApiController]
[Route("/api/v1/[controller]")]
public class MercadoPagoController(IOptions<ApiSettings> apiSettings, AppDBContext context) : ControllerBase
{
  private readonly ApiSettings _apiSettings = apiSettings.Value;
  private readonly AppDBContext _context = context;

  [HttpGet("create")]
  public IActionResult CreatePreferences()
  {

    try
    {
      MercadoPagoConfig.AccessToken = _apiSettings.MPAccessToken;

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
            UnitPrice = _apiSettings.RegistrationFee,
        },],
        NotificationUrl = _apiSettings.NotificationUrl,
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

      MercadoPagoConfig.AccessToken = _apiSettings.MPAccessToken;
      formData.TransactionAmount = _apiSettings.RegistrationFee;
      formData.NotificationUrl = _apiSettings.NotificationUrl;

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
      // Obtain the x-signature and x-request-id values from the header
      Request.Headers.TryGetValue("X-Signature", out var xSignature);
      Request.Headers.TryGetValue("X-Request-ID", out var xRequestId);

      // Obtain Query params related to the request URL
      var queryParams = HttpContext.Request.Query;

      // Extract the "data.id" from the query params
      var dataID = queryParams.ContainsKey("data.id") ? queryParams["data.id"].ToString() : string.Empty;

      // Separating the x-signature into parts
      var parts = xSignature.ToString().Split(',');

      // Initializing variables to store ts and hash
      string? ts = null, hash = null;

      // Iterate over the values to obtain ts and v1
      foreach (var part in parts)
      {
        var keyValue = part.Split('=', 2);
        if (keyValue.Length == 2)
        {
          var key = keyValue[0].Trim();
          var value = keyValue[1].Trim();
          if (key == "ts") ts = value;
          else if (key == "v1") hash = value;

        }
      }

      // Obtain the secret key for the user/application
      var secret = _apiSettings.MPWebhookSecret;

      // Generate the manifest string
      var manifest = $"id:{dataID};request-id:{xRequestId};ts:{ts};";

      // Create an HMAC signature defining the hash type and the key as a byte array
      var sha = CreateHmacSha256(manifest, secret);
      if (sha != hash)
        return BadRequest("HMAC verification failed");

      MercadoPagoConfig.AccessToken = _apiSettings.MPAccessToken;
      var PaymentClient = new PaymentClient();
      Payment payment = await PaymentClient.GetAsync(test.Data.Id);

      if (payment == null) return BadRequest("Invalid 'test.Data.Id)'");

      var paymentData = new AppContext.Models.Payment
      {
        PaymentId = payment.Id
      };

      if (payment.Metadata.TryGetValue("first_name", out object? FirstName))
        paymentData.FirstName = FirstName as string ?? "Vacío";

      if (payment.Metadata.TryGetValue("last_name", out object? LastName))
        paymentData.LastName = LastName as string ?? "Vacío";

      if (payment.Metadata.TryGetValue("dni", out object? IdentificationNumber))
        paymentData.IdentificationNumber = IdentificationNumber as string ?? "Vacío";


      _context.PaymentTable.Add(paymentData);
      _context.SaveChanges();

      return Ok();
    }
    catch (Exception ex)
    {
      return StatusCode(500, ex.Message);
    }

  }


  private static string CreateHmacSha256(string data, string key)
  {
    using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(key));
    var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
    return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
  }



}



