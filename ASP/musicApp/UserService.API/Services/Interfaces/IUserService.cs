using UserService.API.DTOs;
using UserService.Data.Data.Models;

namespace UserService.API.Services.Interfaces;

public interface IUserService
{
    public Task<bool> CheckIfUserExists(string username);
    public Task<bool> CheckEmailExistsAsync(string email);
    public Task<string> GetIdByEmailAsync(string email);
    public Task<User> GetUserByEmailAsync(string email);

    
}