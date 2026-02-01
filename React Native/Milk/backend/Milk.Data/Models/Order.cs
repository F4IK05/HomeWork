namespace Milk.Data.Models;

public class Order
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string UserId { get; set; }
    public User User { get; set; }

    public string AddressId { get; set; }
    public Address Address { get; set; }

    public string Status { get; set; } = "created";
    // created | paid | delivered | cancelled

    public decimal TotalPrice { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}