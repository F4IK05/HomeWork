using Microsoft.EntityFrameworkCore;
using Project.Data.Contexts;
using Project.Data.Models;

namespace Project;

public class UserManager
{
    
    public bool Register(int roleId, string userName, string password, string email)
    {
        using var context = new GameStoreContext();

        if (context.Users.Any(u => u.UserName == userName || u.Email == email))
        {
            return false;
        }

        var user = new User
        {
            RoleId = roleId,
            UserName = userName,
            Email = email,
            Balance = 0,
            Password = PasswordHash.HashPassword(password)
        };
        
        context.Users.Add(user);
        
        context.SaveChanges();
        return true;
    }

    public bool Login(string userName, string password)
    {
        using var context = new GameStoreContext();
        
        var user = context.Users
            .Include(u => u.Role) // будет жаловаться что Role не видно
            .FirstOrDefault(u => u.UserName == userName);

        if (user == null || !PasswordHash.VerifyPassword(password, user.Password))
        {
            return false;
        }

        //Console.WriteLine($"User logged in.\n User: {user.UserName} Role: {user.Role.Name}");
        return true;
    }

    public bool BuyGame(string userName, List<(int gameId, int quantity)> gameToBuy)
    {
        using var context = new GameStoreContext();
        
        var user = context.Users
            .FirstOrDefault(u => u.UserName == userName);

        if (user == null)
        {
            Console.WriteLine($"User {userName} not found");
            return false;
        }

        if (gameToBuy == null || gameToBuy.Count == 0)
        {
            Console.WriteLine("No game to buy");
            return false;
        }
        
        decimal totalPrice = 0;

        foreach (var (gameId, quantity) in gameToBuy)
        {
            var game = context.Games
                .FirstOrDefault(g => g.Id == gameId);
            
            if (game == null)
            {
                Console.WriteLine("Game not found");
                return false;
            }

            if (quantity <= 0)
            {
                Console.WriteLine("Wrong quantity");
                return false;
            }
            
            if (game.Stock < quantity)
            {
                Console.WriteLine("Not enough in stock");
                return false;
            }

            totalPrice += game.Price * quantity; 
        }
        
        if (user.Balance < totalPrice)
        {
            Console.WriteLine("Not enough money to buy");
            return false;
        }
        
            
        var newOrder = new Order
        {
            UserId = user.Id,
            OrderDate = DateTime.Now,
            TotalAmount = totalPrice,
        };
            
        context.Orders.Add(newOrder);
        context.SaveChanges();

        // Обработка каждой игры отдельно
        foreach (var (gameId, quantity) in gameToBuy)
        {
            var game = context.Games
                .FirstOrDefault(g => g.Id == gameId);

            if (game == null)
            {
                Console.WriteLine("Game not found");
                return false;
            }

            game.Stock -= quantity;

            var newOrderContent = new OrderContent
            {
                OrderId = newOrder.Id,
                GameId = game.Id,
                Quantity = quantity,
                TotalAmount = game.Price,
            };
            
            context.OrderContents.Add(newOrderContent);
        }
        
        user.Balance -= totalPrice;
        
        context.SaveChanges();

        Console.WriteLine("Successfully buy game");
        return true;
    }

    public bool AddMoney(string userName, decimal amount)
    {
        if (amount <= 0 )
        {
            Console.WriteLine("Invalid amount");
            return false;
        }
        
        using var context = new GameStoreContext();
        
        var user = context.Users
            .FirstOrDefault(u => u.UserName == userName);

        if (user == null)
        {
            Console.WriteLine($"User {userName} does not exist");
            return false;
        }

        user.Balance += amount;
        context.SaveChanges();
        return true;
    }

    public void MyInfo(string userName)
    {
        using var context = new GameStoreContext();
        
        var user = context.Users
            .FirstOrDefault(u => u.UserName == userName);

        var games = context.OrderContents
            .Where(oc => oc.Order.UserId == user.Id)
            .Include(oc => oc.Game);
        
            
        Console.WriteLine($"====My info===\n" +
                          $"- User name : {user.UserName}\n" +
                          $"- Email : {user.Email}\n" +
                          $"- Balance : {user.Balance}\n" +
                          $"=====Order History=====");

        foreach (var game in games)
        {
            Console.WriteLine($"- Game name : {game.Game.GameName}");
        }
    }

    public decimal ShowBalance(string userName)
    {
        using var context = new GameStoreContext();
        
        var user = context.Users
            .FirstOrDefault(u => u.UserName == userName);

        if (user == null)
        {
            Console.WriteLine($"User {userName} does not exist");
            return 0;
        }

        return user.Balance;
        
    }
}