using System.ComponentModel.DataAnnotations;

namespace AppContext.Models;

public class Payment
{
  public int Id { get; set; }
  public long? PaymentId { get; set; }


  /** REGISTRATION USER DATA**/
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public string IdentificationNumber { get; set; }


}

