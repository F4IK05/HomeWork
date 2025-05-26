using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Project.Classes;
using Project.Data;

namespace Project.Services;

public class EmailService
{
    public bool SendEmail(EmailMessage email, List<string> attachments)
    {
        try
        {
            var configBuider = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            
            var config = configBuider.Build();
            
            var smtpHost = config["SMTP:Host"];
            var smtpPort = config["SMTP:Port"];
            var smtpUsername = config["SMTP:Username"];
            var smtpPassword = config["SMTP:Password"];
            
            using var client = new SmtpClient(smtpHost, int.Parse(smtpPort))
            {
                Credentials = new NetworkCredential(smtpUsername, smtpPassword),
                EnableSsl = true,
            };

            using var mailMessage = new MailMessage
            {
                From = new MailAddress(email.From),
                Subject = email.Subject,
                Body = email.Body,
                IsBodyHtml = true
            };
            
            mailMessage.To.Add(email.To);

            foreach (var attachment in attachments)
            {
                mailMessage.Attachments.Add(new Attachment(attachment));
            }

            client.Send(mailMessage);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    public void Export(int userId)
    {
        using var context = new MovieFavContext();
        var favoriteService = new FavoriteService();
        
        var user = context.Users.FirstOrDefault(u => u.Id == userId);
        
        if (user == null) return;
        
        var favorites = favoriteService.GetFavoritesByUserId(userId);
        
        if (favorites.Count == 0) return;
        
        var pdfService = new PdfService();
        var pdfFiles = pdfService.GenerateFavoriteMoviesPdf(favorites, user.Email);

        var emailBody = $@"
            <h2>Hi, {user.UserName}.</h2>
            <p>This is your favorite movies.</p>
        ";

        var email = new EmailMessage(
            from: "faik.hasanov05@gmail.com",
            to: user.Email,
            subject: $"{user.UserName}'s favorite Movies",
            body: emailBody
        );

        var emailService = new EmailService();
        if (emailService.SendEmail(email, pdfFiles))
        {
            Console.WriteLine("Sent an email!");
        }

        ;
    }
}