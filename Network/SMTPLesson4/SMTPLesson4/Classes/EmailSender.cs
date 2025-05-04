using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace SMTPLesson4.Classes;

public class EmailSender
{
    public bool Send(EmailMessage email)
    {
        try
        {
            var configBuilder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
        
            var config = configBuilder.Build();
        
            var smtpHost = config["SMTP:Host"];
            var smtpPort = config["SMTP:Port"];
            var smtpUsername = config["SMTP:Username"];
            var smtpPassword = config["SMTP:Password"];

            using var client = new SmtpClient(smtpHost, int.Parse(smtpPort))
            {
                Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                EnableSsl = true
            };
        
            using var message = new MailMessage(email.From, email.To, email.Subject, email.Body);

            client.Send(message);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine("Неправильно переданные данные!");
            return false;
        }
    }
}