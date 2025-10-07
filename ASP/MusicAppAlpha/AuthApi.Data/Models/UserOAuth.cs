namespace AuthApi.Data.Models;

public class UserOAuth
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    // Название провайдера: "Google", "Facebook", "Github"
    public string Provider { get; set; } = string.Empty;
    
    // Id пользователя у провайдера
    public string ProviderUserId { get; set; } = string.Empty;

    // Ключ на User
    public string UserId { get; set; } = string.Empty;
    public User User { get; set; }
}