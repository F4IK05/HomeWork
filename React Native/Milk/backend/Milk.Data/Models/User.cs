namespace Milk.Data.Models;

public class User
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = String.Empty;
    
    public string AvatarUrl { get; set; } = string.Empty;
    
    public string Email { get; set; } = String.Empty;
    public string PasswordHash { get; set; } = String.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public ICollection<Address> Addresses { get; set; } = new List<Address>();
    public ICollection<Order> Orders { get; set; } = new List<Order>();
}