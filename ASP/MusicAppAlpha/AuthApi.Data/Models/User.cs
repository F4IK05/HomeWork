namespace AuthApi.Data.Models;

public class User
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PasswordHash { get; set; }
    public bool IsConfirmed { get; set; } = false;
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiry { get; set; }
    public string? AvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    
    public ICollection<UserRoles> UserRoles { get; set; }
    
    // для OAuth
    public ICollection<UserOAuth> OAuthAccounts { get; set; } = new List<UserOAuth>();
    
}