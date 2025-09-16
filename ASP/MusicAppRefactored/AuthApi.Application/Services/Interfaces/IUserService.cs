using AuthApi.Data.Models;

namespace AuthApi.Application.Services.Interfaces;

public interface IUserService
{
    public Task<bool> CheckIfUserExists(string username);
    public Task<bool> CheckEmailExistsAsync(string email);
    public Task<string> GetIdByEmailAsync(string email);
    public Task<User> GetUserByEmailAsync(string email);

    
}