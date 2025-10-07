namespace AuthApi.Data.Models;

public class Role
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    
    public ICollection<UserRoles> UserRoles { get; set; }
}