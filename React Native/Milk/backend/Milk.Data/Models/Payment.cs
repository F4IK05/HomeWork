namespace Milk.Data.Models;

public class Payment
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    public string OrderId { get; set; }
    public Order Order { get; set; }

    public string Provider { get; set; } = "stripe";
    
    public string PaymentIntentId { get; set; } = string.Empty;
    public string Status { get; set; } = "created";
    
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "usd";
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? PaidAt { get; set; }
}