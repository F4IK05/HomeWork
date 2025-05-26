using Project;
using QuestPDF.Infrastructure;

Methods methods = new Methods();

QuestPDF.Settings.License = LicenseType.Community;

while (true)
{
    Console.WriteLine("1. Registration\n2. Login\n3. Exit\nChoose an option: ");
    
    string input1 = Console.ReadLine();

    switch (input1)
    {
        case "1":
            methods.Register();
            break;
        case "2":
            methods.Login();
            break;
        case "3":
            return;
        default:
            Console.WriteLine("Invalid input. Please try again.");
            break;
    }
}


