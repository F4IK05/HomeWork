namespace Project.Data.Models;

public class User
{
    public int Id { get; set; }
    
    public int RoleId { get; set; }
    public Role Role { get; set; }
    public string UserName { get; set; }
    
    public string Password { get; set; } // это я так понял хэш
    public string Email { get; set; }
    public decimal Balance { get; set; }
    
    public ICollection<Order> Orders { get; set; }
}