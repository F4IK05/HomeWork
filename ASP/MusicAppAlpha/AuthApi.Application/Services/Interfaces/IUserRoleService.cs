namespace AuthApi.Application.Services.Interfaces;

public interface IUserRoleService
{
    Task AssignRoleToUserAsync(string userId, string roleName = "Guest");
    Task RemoveRoleFromUserAsync(string userId, string roleName);
}