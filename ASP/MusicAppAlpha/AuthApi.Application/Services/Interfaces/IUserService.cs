using AuthApi.Data.Models;

namespace AuthApi.Application.Services.Interfaces;

public interface IUserService
{
    Task<bool> CheckIfUserExists(string username);
    Task<bool> CheckEmailExistsAsync(string email);
    Task<string> GetIdByEmailAsync(string email);
    Task<User> GetUserByEmailAsync(string email);
}