using Project;


var manager = new Manager();

while (true)
{
    Console.WriteLine("1. Registration\n 2. Login\n 3. Exit\nChoose an option: ");
    
    string input = Console.ReadLine();

    switch (input)
    {
        case "1":
            Console.WriteLine("You have selected Registration: ");

            Console.Write("Username: ");
            string userName = Console.ReadLine();

            Console.Write("Email: ");
            string email = Console.ReadLine();

            Console.Write("Password: ");
            string password = Console.ReadLine();

            if (manager.Register(1, userName, password, email))
            {
                Console.WriteLine("Congratulations! Your account has been successfully registered! Please, login now.");
            }
            else
            {
                Console.WriteLine("User already exists.");
            }
            break;
        case "2":
            Console.WriteLine("You have selected Login: ");
            
            Console.Write("Username: ");
            string userNameForLogin = Console.ReadLine();

            Console.Write("Password: ");
            string passwordForLogin = Console.ReadLine();

            if (manager.Login(userNameForLogin, passwordForLogin) && userNameForLogin == "Admin")
            {
                Console.WriteLine("This is an Admin Account.");
            }
            else if (manager.Login(userNameForLogin, passwordForLogin))
            {
                Console.WriteLine("This is an User Account.");
            }

            else
            {
                Console.WriteLine("Invalid credentials.");
            }
            break;
    }
}