namespace Milk.Data.Models;

public class CartItem
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    public string CartId { get; set; } = string.Empty;
    public Cart Cart { get; set; }
    
    public string ProductId { get; set; } = string.Empty;
    public Product Product { get; set; }
    
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}