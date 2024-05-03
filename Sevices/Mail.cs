using System.Net;
using System.Net.Mail;
using Helpers;
using Microsoft.Extensions.Options;

namespace Services;

public interface IMailService
{
  void SendEmail(string to, string subject, string body);
}


public class MailService : IMailService
{
  private string From { get; set; }
  private string AppPassword { get; set; }

  public MailService(IOptions<AppSettings> appSettings)
  {
    From = appSettings.Value.GmailUser;
    AppPassword = appSettings.Value.GmailPassword;
  }

  public void SendEmail(string to, string subject, string body)
  {
    try
    {
      var fromAddress = new MailAddress(From);
      var toAddress = new MailAddress(to);
      var fromPassword = AppPassword;

      using var smtp = new SmtpClient
      {
        Host = "smtp.gmail.com",
        Port = 587,
        EnableSsl = true,
        DeliveryMethod = SmtpDeliveryMethod.Network,
        UseDefaultCredentials = false,
        Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
      };

      using var message = new MailMessage(fromAddress, toAddress)
      {
        Subject = subject,
        Body = body,
        IsBodyHtml = true,
      };
      smtp.Send(message);
    }
    catch (Exception)
    {
      throw;
    }
  }
}