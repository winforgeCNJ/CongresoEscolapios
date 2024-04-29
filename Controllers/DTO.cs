using System.ComponentModel.DataAnnotations;
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
  [Required]
  public PaymentCreateRequest formData { get; set; }
  [Required]
  public string paymentMethod { get; set; }
  [Required]
  public string cardholderName { get; set; }
  [Required]
  public string lastFourDigits { get; set; }
  [Required]
  public string firstName { get; set; }
  [Required]
  public string lastName { get; set; }
  [Required]
  public string DNI { get; set; }

}



public class AppSettings
{
  public string MPAccessToken { get; set; }
  public string MPWebhookSecret { get; set; }
  public long RegistrationFee { get; set; }
  public string NotificationUrl { get; set; }
  public string GmailUser { get; set; }
  public string GmailPassword { get; set; }

}