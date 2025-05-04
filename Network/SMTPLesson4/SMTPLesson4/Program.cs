using SMTPLesson4.Classes;

var sender = new EmailSender();

Console.Write("Ваш e-mail: ");
var emailSender = Console.ReadLine();

Console.Write("E-mail получателя: ");
var emailRecipient = Console.ReadLine();

Console.WriteLine("Заговолок: ");
var emailSubject = Console.ReadLine();

Console.WriteLine("Тело: ");
var emailBody = Console.ReadLine();

var message = new EmailMessage(emailSender, emailRecipient, emailSubject, emailBody);
if (sender.Send(message))
{
    Console.WriteLine("Сообщение передано успешно!");
};