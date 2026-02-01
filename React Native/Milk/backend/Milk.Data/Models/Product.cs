namespace Milk.Data.Models;

public class Product
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public decimal Price { get; set; }
    public string Volume { get; set; } = string.Empty;

    public string ImageUrl { get; set; } = string.Empty;
    
    public string CategoryId { get; set; } = string.Empty;
    public Category Category { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}