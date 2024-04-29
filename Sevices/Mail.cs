using System.Net;
using System.Net.Mail;
using DTO;
using Microsoft.Extensions.Options;

namespace Services;

public interface IMailService
{
  void SendEmail(string to, string subject, string body);
}


public class MailService(IOptions<AppSettings> appSettings) : IMailService
{
  private readonly string from = appSettings.Value.GmailUser;
  private readonly string appPassword = appSettings.Value.GmailPassword;

  public void SendEmail(string to, string subject, string body)
  {
    try
    {
      var fromAddress = new MailAddress(from);
      var toAddress = new MailAddress(to);
      var fromPassword = appPassword;

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