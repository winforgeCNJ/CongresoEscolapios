using System.ComponentModel.DataAnnotations;
using MercadoPago.Client.Payment;
using Newtonsoft.Json;

namespace DTO;



public class DTOPaymentReq
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



