using System.ComponentModel.DataAnnotations;
using MercadoPago.Client.Payment;
using Newtonsoft.Json;

namespace DTO;
public class DTOWebhookReq
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



