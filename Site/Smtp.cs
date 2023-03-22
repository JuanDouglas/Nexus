using System.Net.Mail;

namespace Nexus.Web;

public class EmailMessageSender
{
    private const string section = "Smtp";
    private readonly Smtp smtp;

    public Smtp Smtp => smtp;
    public EmailMessageSender(IConfiguration config)
    {
        var sec = config.GetSection(section);

        smtp = sec.Get<Smtp>();
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="htmlContent"></param>
    /// <param name="subject"></param>
    /// <param name="to"></param>
    /// <returns></returns>
    /// 
    public async Task SendEmailAsync(string htmlContent, string subject, string to, string from = "no-reply@mail.nexus-company.net", bool isHtml = true)
        => await SendWithSmtpAsync(htmlContent, subject, to, from,isHtml);

    private async Task SendWithSmtpAsync(string htmlContent, string subject, string to, string from, bool isHtml)
    {
        try
        {
            MailMessage mail = new();
            using SmtpClient SmtpServer = new(Smtp.Host);

            mail.From = new MailAddress(from);
            mail.To.Add(to);
            mail.Subject = subject;
            mail.Body = htmlContent;
            mail.IsBodyHtml = isHtml;

            SmtpServer.Credentials = new System.Net.NetworkCredential(Smtp.Login, Smtp.Password);
            SmtpServer.EnableSsl = Smtp.EnableSsl;
            SmtpServer.Port = Smtp.Port;
            SmtpServer.UseDefaultCredentials = false;

            SmtpServer.Send(mail);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.ToString());
            throw;
        }
    }
}

public class Smtp
{
    public string Host { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    public bool EnableSsl { get; set; }
    public int Port { get; set; }
}