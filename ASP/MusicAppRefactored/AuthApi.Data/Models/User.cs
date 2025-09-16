namespace AuthApi.Data.Models;

public class User
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string UserName { get; set; }
    public string Email { get; set; }
    public string? Password { get; set; }
    public bool isConfirmed { get; set; } = false;
    public ICollection<UserRole> UserRoles { get; set; }
    
    // для OAuth
    public string? GoogleId { get; set; }
    public string? AvatarUrl { get; set; }
}