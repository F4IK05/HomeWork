using Project.Data.Models;

namespace Project;

public class AllMethods
{
    public void Register()
    {
        var userManager = new UserManager();
        
        Console.Clear();
        Console.WriteLine("You have selected Registration: ");

        Console.Write("Username: ");
        string userName = Console.ReadLine();

        Console.Write("Email: ");
        string email = Console.ReadLine();

        Console.Write("Password: ");
        string password = Console.ReadLine();

        if (userManager.Register(1, userName, password, email))
        {
            Console.WriteLine("Congratulations! Your account has been successfully registered! Please, login now.");
        }
        else
        {
            Console.WriteLine("User already exists.");
        }
    }

    public void Login()
    {
        var userManager = new UserManager();
        var adminManager = new AdminManager();
        
        adminManager.DeleteGameIfQuantityIsZero(); // Не уверен что ее надо применять здесь(в этом месте)
        
        Console.Clear();
            Console.WriteLine("You have selected Login: ");
            
            Console.Write("Username: ");
            string userNameForLogin = Console.ReadLine();

            Console.Write("Password: ");
            string passwordForLogin = Console.ReadLine();

            if (userManager.Login(userNameForLogin, passwordForLogin) && userNameForLogin == "Admin")
            {
                Console.WriteLine("This is an Admin Account.");

                while (true)
                {
                    Console.WriteLine(
                        "Options:\n1. Add game\n2. Edit game\n3. Delete game\n4. Show game list\n5. Exit");
                    string input2 = Console.ReadLine();

                    switch (input2)
                    {
                        case "1":
                            Console.Write("Game title: ");
                            string title = Console.ReadLine();

                            Dictionary<string, int> genres = new()
                            {
                                { "1", 1 }, // Action
                                { "2", 2 }, // RPG
                                { "3", 3 }, // Strategy
                                { "4", 4 } // Sports
                            };

                            Console.WriteLine("Choose game genre:\n" +
                                              "1. Action\n" +
                                              "2. RPG\n" +
                                              "3. Strategy\n" +
                                              "4. Sports");

                            string genreChoice = Console.ReadLine();

                            if (!genres.ContainsKey(genreChoice))
                            {
                                Console.WriteLine("Wrong option.");
                                break;
                            }

                            int genreId = genres[genreChoice];

                            Dictionary<string, int> platforms = new()
                            {
                                { "1", 1 }, // PC
                                { "2", 2 }, // Playstation
                                { "3", 3 }, // Xbox
                                { "4", 4 } // NS
                            };

                            Console.WriteLine("Choose game platform:\n" +
                                              "1. PC\n" +
                                              "2. Playstation\n" +
                                              "3. Xbox\n" +
                                              "4. Nintendo Switch");

                            string platformChoice = Console.ReadLine();

                            if (!platforms.ContainsKey(platformChoice))
                            {
                                Console.WriteLine("Wrong option.");
                                break;
                            }

                            int platformId = platforms[platformChoice];

                            Console.Write("Enter price: ");
                            if (!decimal.TryParse(Console.ReadLine(), out decimal price))
                            {
                                Console.WriteLine("Wrong price.");
                                break;
                            }

                            Console.Write("Enter quantity: ");
                            if (!int.TryParse(Console.ReadLine(), out int quantity))
                            {
                                Console.WriteLine("Wrong quantity.");
                                break;
                            }

                            if (adminManager.AddGame(title, genreId, platformId, price, quantity))
                            {
                                Console.WriteLine("Game added successfully.");
                            } 

                            break;
                        case "2":
                            adminManager.ShowGames();

                            Console.Write("\nEnter Game ID to update: ");
                            if (!int.TryParse(Console.ReadLine(), out int gameid))
                            {
                                Console.WriteLine("Wrong Game ID.");
                                return;
                            }

                            var game = adminManager.GetGameById(gameid);
                            if (game == null)
                            {
                                Console.WriteLine("Game not found.");
                                return;
                            }

                            Console.Write($"Current game title: {game.GameName} \n" +
                                          $"Enter new title (or press Enter to keep the same): ");
                            string newTitle = Console.ReadLine();
                            if (!string.IsNullOrWhiteSpace(newTitle))
                            {
                                game.GameName = newTitle;
                            }

                            Console.Write($"Current price: {game.Price} \n" +
                                          $"Enter new price (or press Enter to keep the same): ");
                            string priceInput = Console.ReadLine();
                            if (decimal.TryParse(priceInput, out decimal newPrice) && newPrice > 0)
                            {
                                game.Price = newPrice;
                            }

                            Console.Write($"Current quantity: {game.Stock} \n" +
                                          $"Enter new quantity (or press Enter to keep the same): ");
                            string quantityInput = Console.ReadLine();
                            if (int.TryParse(quantityInput, out int newQuantity) && newQuantity > 0)
                            {
                                game.Stock = newQuantity;
                            }

                            if (adminManager.EditGame(gameid, newTitle, newPrice, newQuantity))
                            {
                                Console.WriteLine("Game updated successfully.");
                            }

                            break;
                        case "3":
                            adminManager.ShowGames();

                            Console.WriteLine("\nEnter game id: ");
                            if (!int.TryParse(Console.ReadLine(), out int gameId))
                            {
                                Console.WriteLine("Wrong game id.");
                                break;
                            }

                            if (adminManager.DeleteGame(gameId))
                            {
                                Console.WriteLine("Game deleted successfully.");
                            }

                            break;
                        case "4":
                            adminManager.ShowGames();
                            break;
                        case "5":
                            return;
                        default:
                            Console.WriteLine("Invalid input.");
                            break;
                    }
                }
            }
            else if (userManager.Login(userNameForLogin, passwordForLogin))
            {
                Console.WriteLine("This is an User Account.");

                while (true)
                {
                    Console.WriteLine("Options:\n1. Show game list\n2. Buy game\n3. Add balance\n4. My info(OrderHistory)\n5. Exit");
                    string input3 = Console.ReadLine();

                    switch (input3)
                    {
                        case "1":
                            adminManager.ShowGames();
                            break;
                        case "2":
                            adminManager.ShowGames();
                            
                            var gameToBuy = new List<(int, int)>();

                            while (true)
                            {
                                Console.Write("Enter game ID to buy: ");
                                if (!int.TryParse(Console.ReadLine(), out int gameId))
                                {
                                    Console.WriteLine("Wrong game ID.");
                                    continue;
                                }

                                Console.Write("Enter quantity: ");
                                if (!int.TryParse(Console.ReadLine(), out int quantity))
                                {
                                    Console.WriteLine("Wrong quantity.");
                                    continue;
                                }

                                gameToBuy.Add((gameId, quantity));

                                Console.WriteLine("Do you want to buy another game?(y/n)");
                                string answer = Console.ReadLine();

                                if (answer == "n")
                                {
                                    break;
                                }
                            }

                            if (gameToBuy.Count > 0)
                            {
                                if (userManager.BuyGame(userNameForLogin, gameToBuy))
                                {
                                    Console.WriteLine("Game buy successfully.");
                                }
                                else
                                {
                                    Console.WriteLine("Game buy failed.");
                                }
                            }
                            else
                            {
                                Console.WriteLine("Error");
                            }

                            break;
                        case "3":
                            Console.WriteLine("You have selected Add balance: ");
                            Console.WriteLine("Enter amount: ");
                            if (decimal.TryParse(Console.ReadLine(), out decimal amount))
                            {
                                userManager.AddMoney(userNameForLogin, amount);
                                Console.WriteLine(
                                    $"Your balance has been updated. Current balance is: {userManager.ShowBalance(userNameForLogin)}");
                            }
                            else
                            {
                                Console.WriteLine("You have entered an incorrect amount.");
                            }

                            break;
                        case "4":
                            userManager.MyInfo(userNameForLogin);
                            break;
                        case "5":
                            return;
                        default:
                            Console.WriteLine("Invalid input.");
                            break;

                    }
                }

            }

            else
            {
                Console.WriteLine("Invalid credentials.");
            }
    }
}