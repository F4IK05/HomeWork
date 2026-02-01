namespace Milk.Data.Models;

public class Category
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string Name { get; set; } = string.Empty;   // Fresh Milk, Yogurt
    public string Slug { get; set; } = string.Empty;   // fresh-milk, yogurt

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Product> Products { get; set; } = new List<Product>();
}