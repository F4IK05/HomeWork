namespace Project.Data.Models;

public class OrderContent
{
    public int Id { get; set; }
    
    public int OrderId { get; set; }
    public Order Order { get; set; }
    
    public int GameId { get; set; }
    public Game Game { get; set; }
    
    public int Quantity { get; set; }
    public decimal TotalAmount { get; set; }
}