namespace Project.Data.Models;

public class User
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public decimal Balance { get; set; }
    
    public ICollection<Order> Orders { get; set; }
}