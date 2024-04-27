using MercadoPago.Client.Payment;
using Newtonsoft.Json;

namespace DTO;
public class PaymentNotificationDto
{
  [JsonProperty("action")]
  public string Action { get; set; }

  [JsonProperty("data")]
  public PaymentData Data { get; set; }

  [JsonProperty("date_created")]
  public DateTime DateCreated { get; set; }

  [JsonProperty("id")]
  public long Id { get; set; }

  [JsonProperty("live_mode")]
  public bool LiveMode { get; set; }

  [JsonProperty("type")]
  public string Type { get; set; }

  [JsonProperty("user_id")]
  public int UserId { get; set; }
}

public class PaymentData
{
  [JsonProperty("id")]
  public long Id { get; set; }
}



public class PayRequestDTO
{
  public PaymentCreateRequest formData { get; set; }
  public string paymentMethod { get; set; }
  public string cardholderName { get; set; }
  public string lastFourDigits { get; set; }
  public string firstName { get; set; }
  public string lastName { get; set; }
  public string DNI { get; set; }

}



public class ApiSettings
{
  public string MPAccessToken { get; set; }
  public string MPWebhookSecret { get; set; }
  public long RegistrationFee { get; set; }
  public string NotificationUrl { get; set; }


}