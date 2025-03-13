using Microsoft.EntityFrameworkCore;
using Project.Data.Contexts;
using Project.Data.Models;

namespace Project;

public class AdminManager
{
    public bool AddGame(string name, int genreId, int platformId, decimal price, int quantity)
    {
        using var context = new GameStoreContext();

        if (context.Games.Any(g => g.GameName == name))
        {
            return false;
        }

        var newGame = new Game
        {
            GameName = name,
            GenreId = genreId,
            PlatformId = platformId,
            Price = price,
            Stock = quantity
        };
        
        context.Games.Add(newGame);
        context.SaveChanges();
        return true;
    }

    public bool DeleteGame(int gameId)
    {
        using var context = new GameStoreContext();
        
        var game = context.Games.Find(gameId);
        
        if (game == null)
        {
            Console.WriteLine("Game not found");
            return false;
        }
        
        context.Games.Remove(game);
        context.SaveChanges();
        return true;
    }
    
    public bool EditGame(int gameId, string newName, decimal newPrice, int newQuantity) 
    {
        using var context = new GameStoreContext();

        var game = context.Games.Find(gameId);

        if (game == null)
        {
            Console.WriteLine("Game not found");
            return false;
        }

        if (game.GameName != newName && !string.IsNullOrEmpty(newName))
        {
            game.GameName = newName;
        }

        if (game.Price != newPrice && newPrice > 0)
        {
            game.Price = newPrice;
        }

        if (game.Stock != newQuantity)
        {
            game.Stock = newQuantity;
        }
        
        context.SaveChanges();
        return true;
    }

    public Game GetGameById(int gameId)
    {
        using var context = new GameStoreContext();
        
        var game = context.Games.FirstOrDefault(g => g.Id == gameId);
        
        return game;
    }

    public void ShowGames()
    {
        using var context = new GameStoreContext();
        
        var games = context.Games
            .Include(g => g.Genre)
            .Include(g => g.Platform);

        if (!games.Any())
        {
            Console.WriteLine("No games found");
            return;
        }

        Console.WriteLine("Game list: ");

        foreach (var game in games)
        {
            Console.WriteLine($"Id: {game.Id}\n" +
                              $"===================\n" +
                              $"Game title: {game.GameName} | Game genre: {game.Genre.Name}\n" +
                              $"Game platform: {game.Platform.Name} | Price: {game.Price}\n" +
                              $"Stock(quantity): {game.Stock}\n" +
                              $"=======================================");
        }
    }
}