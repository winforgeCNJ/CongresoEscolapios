using MercadoPago.Resource.Payment;

namespace Helpers;


public class PaymentGroupInfo
{
  public long PaymentId { get; set; }
  public List<AppContext.Models.PaymentTable> Payments { get; set; }
  public Payment PaymentInfoMP { get; set; }
}
