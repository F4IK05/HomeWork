namespace Project.Data.Models;

public class Game
{
    public int Id { get; set; }
    public string GameName { get; set; }
    
    public int GenreId { get; set; }
    public Genre Genre { get; set; }
    
    public int PlatformId { get; set; }
    public Platform Platform { get; set; }
    
    public decimal Price { get; set; }
    
    public int Stock { get; set; } // сколько в наличии
    
    // Одна игра может быть куплена в нескольких заказах.
    public ICollection<OrderContent> OrderContents { get; set; }
}