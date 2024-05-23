namespace AppContext.Models;

public class PrePayment
{
  public int Id { get; set; }

  /** REGISTRATION USER DATA**/
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public string IdentificationNumber { get; set; }
  public string PhoneNumber { get; set; }
  public string Mail { get; set; }
  public string PaymentMethodId { get; set; }
  public string PaymentMethod { get; set; }

  public DateTime CreateDate { get; set; }
  public DateTime UpdateDate { get; set; }


}

