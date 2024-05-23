using System.ComponentModel.DataAnnotations;
using MercadoPago.Client.Payment;
using Newtonsoft.Json;

namespace DTO;



public class DTOPreferenceReq
{
  [Required]
  public string firstName { get; set; }
  [Required]
  public string lastName { get; set; }
  [Required]
  public string DNI { get; set; }
  [Required]
  public string phoneNumber { get; set; }
  [Required]
  public string mail { get; set; }

}



