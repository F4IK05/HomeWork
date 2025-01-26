using System.Threading.Channels;
using Project.Classes;
using Project.Data.DTO.Users;
using Project.Interfaces;

IAuthSystem authSystem = new AuthSystem();
IShowRoomManger roomSystem = new ShowRoomManager();
ShowRoomManager showRoomManager = new ShowRoomManager();
IShowRoom carSystem = new Showroom();

bool isFinished1 = false;

while (!isFinished1)
{
    Console.WriteLine("1. Register\n2. Login\n3. Showroom option(admin)\n4. Cars option(admin)\n5. Exit");

    string userInput = Console.ReadLine();

    switch (userInput)
    {
        case "1":
            Console.WriteLine("Enter username: ");
            string usernameR = Console.ReadLine();
        
            Console.WriteLine("Enter password: ");
            string passwordR = Console.ReadLine();
            
            
            var registerDTO = new LoginRegisterDTO(usernameR, passwordR);

            if (!ValidateSystem.ValidateCredentials(registerDTO))
            {
                Console.WriteLine("Invalid username or password");
            }
            else
            {
                
                authSystem.Register(registerDTO);
            }
            break;
        case "2":
            Console.WriteLine("Enter username: ");
            string usernameL = Console.ReadLine();
            Console.WriteLine("Enter password: ");
            string passwordL = Console.ReadLine();
            
            var loginDTO = new LoginRegisterDTO(usernameL, passwordL);

            if (!ValidateSystem.ValidateCredentials(loginDTO))
            {
                Console.WriteLine("Invalid username or password");
            }
            else
            {
                authSystem.Login(loginDTO);

                roomSystem.Login(loginDTO);
                
                

                
            }
            break;
        case "3":
            bool isFinished2 = false;
            while (!isFinished2)
            {
                Console.WriteLine("1. Create showroom\n2. Edit Showroom\n3. Remove Showroom\n4. Back");
                string choice = Console.ReadLine();
                switch (choice)
                {
                    case "1":
                        Console.WriteLine("Enter showroom name: ");
                        string roomName = Console.ReadLine();

                        Console.WriteLine("Enter car capacity: ");
                        if (!int.TryParse(Console.ReadLine(), out var capacity) || capacity < 1)
                        {
                            Console.WriteLine("Invalid capacity");
                            return;
                        }

                        roomSystem.CreateShowRoom(roomName, capacity);
                        break;
                    case "2":
                        Console.WriteLine("Enter showroom name: ");
                        string roomNameE = Console.ReadLine();

                        Console.WriteLine("Enter new showroom name: ");
                        string newRoomNameE = Console.ReadLine();

                        Console.WriteLine("Enter new car capacity: ");
                        if (!int.TryParse(Console.ReadLine(), out var capacityE) || capacityE < 1)
                        {
                            Console.WriteLine("Invalid capacity");
                            return;
                        }

                        roomSystem.EditRoom(roomNameE, newRoomNameE, capacityE);
                        break;
                    case "3":
                        Console.WriteLine("Enter showroom name for delete: ");
                        string roomNameD = Console.ReadLine();

                        roomSystem.DeleteRoom(roomNameD);
                        break;
                    case "4":
                        isFinished2 = true;
                        break;
                }
                
            }

            break;

        case "4":
            bool isFinished3 = false;
            while (!isFinished3)
            {
                Console.WriteLine("1. Add car to showroom.\n2. Edit car in showroom.\n3. Remove from showroom.\n4. Show cars\n5. Back");
                
                string choice = Console.ReadLine();

                switch (choice)
                {
                    case "1":
                        Console.WriteLine("Enter showroom name: ");
                        string srNameC = Console.ReadLine();
                        roomSystem.FindRoom(srNameC);

                        Console.WriteLine("Enter car make: ");
                        string carMake = Console.ReadLine();

                        Console.WriteLine("Enter car model: ");
                        string carModel = Console.ReadLine();

                        Console.WriteLine("Enter car year: ");
                        int carYear = int.Parse(Console.ReadLine());
                        
                        carSystem.AddCar( srNameC, carMake, carModel, new DateTime(carYear, 1, 1));
                        
                        break;
                    case "2":
                        Console.WriteLine("Enter showroom name: ");
                        string srNameE = Console.ReadLine();
                        roomSystem.FindRoom(srNameE);

                        Console.WriteLine("Enter old car make: ");
                        string oldMake = Console.ReadLine();
                        
                        Console.WriteLine("Enter old car model: ");
                        string oldModel = Console.ReadLine();

                        Console.WriteLine("Enter new car make: ");
                        string newMake = Console.ReadLine();
                        
                        Console.WriteLine("Enter new car model: ");
                        string newModel = Console.ReadLine();
                        
                        Console.WriteLine("Enter new car year: ");
                        int newYear = int.Parse(Console.ReadLine());
                        
                        carSystem.UpdateCar(srNameE, oldMake, oldModel ,newMake, newModel, new DateTime(newYear, 1, 1));
                    break;
                    case "3":
                        Console.WriteLine("Enter showroom name: ");
                        string srNameD = Console.ReadLine();
                        roomSystem.FindRoom(srNameD);
                        
                        Console.WriteLine("Enter car make: ");
                        string carMakeD = Console.ReadLine();
                        
                        Console.WriteLine("Enter car model: ");
                        string carModelD = Console.ReadLine();
                        
                        carSystem.RemoveCar(srNameD, carMakeD, carModelD);
                        
                        break;
                    case "4":
                        Console.WriteLine("Enter showroom name: ");
                        string srNameR = Console.ReadLine();
                        roomSystem.FindRoom(srNameR);
                        
                        carSystem.ReadCars(srNameR);
                        break;
                }
            }

            
            break;
        case "5":
            isFinished1 = true;
            Console.WriteLine("Goodbye!");
            break;
}
}

