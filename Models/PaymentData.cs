
namespace AppContext.Models;

public class PaymentTable
{
  public int Id { get; set; }
  public long PaymentId { get; set; }
  public string paymentStatus { get; set; }


  /** REGISTRATION USER DATA**/
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public long IdentificationNumber { get; set; }
  public string PhoneNumber { get; set; }
  public string Mail { get; set; }
  public long NotificationId { get; set; }

  public DateTime CreateDate { get; set; }
  public DateTime UpdateDate { get; set; }


}
