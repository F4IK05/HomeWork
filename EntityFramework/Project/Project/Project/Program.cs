using Project;

var userManager = new UserManager();
var adminManager = new AdminManager();
var methods = new AllMethods();

while (true)
{
    Console.WriteLine("1. Registration\n 2. Login\n 3. Exit\nChoose an option: ");
    
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
            Console.WriteLine("Bye bye!");
            return;
        default:
            Console.WriteLine("Wrong input!");
            break;
    }
}