using System.Security.Cryptography;
using System.Text;
using Helpers;
using Microsoft.Extensions.Options;

namespace Services;


public interface IMercadoPagoService
{
  bool VerifySignature(HttpRequest request);
  string? GetDictionaryData(string key, IDictionary<string, object> dictionary);
  long GetLongData(string key, IDictionary<string, object> dictionary);
}

public class MercadoPagoService : IMercadoPagoService
{

  private string Secret { get; set; }
  public MercadoPagoService(IOptions<AppSettings> appSettings) => Secret = appSettings.Value.MPWebhookSecret;

  public bool VerifySignature(HttpRequest request)
  {
    try
    {
      // Obtain the x-signature and x-request-id values from the header
      request.Headers.TryGetValue("X-Signature", out var xSignature);
      request.Headers.TryGetValue("X-Request-ID", out var xRequestId);

      // Obtain Query params related to the request URL
      var queryParams = request.Query;

      // Extract the "data.id" from the query params
      var dataID = queryParams.ContainsKey("data.id") ? queryParams["data.id"].ToString() : string.Empty;

      // Separating the x-signature into parts
      var parts = xSignature.ToString().Split(',');

      // Initializing variables to store ts and hash
      string? ts = null, hash = null;

      // Iterate over the values to obtain ts and v1
      foreach (var part in parts)
      {
        var keyValue = part.Split('=', 2);
        if (keyValue.Length == 2)
        {
          var key = keyValue[0].Trim();
          var value = keyValue[1].Trim();
          if (key == "ts") ts = value;
          else if (key == "v1") hash = value;

        }
      }

      // Obtain the secret key for the user/application

      // Generate the manifest string
      var manifest = $"id:{dataID};request-id:{xRequestId};ts:{ts};";

      // Create an HMAC signature defining the hash type and the key as a byte array
      var sha = CreateHmacSha256(manifest, Secret);
      if (sha != hash)
        return false;

      return true;

    }
    catch (Exception)
    {

      throw;
    }
  }

  private static string CreateHmacSha256(string data, string key)
  {
    using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(key));
    var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
    return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
  }

  public string? GetDictionaryData(string key, IDictionary<string, object> dictionary)
  {

    dictionary.TryGetValue(key, out object? value);
    return value as string ?? null;
  }

  public long GetLongData(string key, IDictionary<string, object> dictionary)
  {
    if (dictionary.TryGetValue(key, out object? value) && long.TryParse(value as string, out long result))
    {
      return result;
    }
    return 0; // or any other default value indicating 'not found' or 'error'
  }


}