using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UserService.API.DTOs;
using UserService.API.Services.Interfaces;
using UserService.Data.Data.Contexts;
using UserService.Data.Data.Models;

namespace UserService.API.Services.Classes;

public class UserService : IUserService
{
    private readonly UserDbContext _context;
    private readonly IMapper _mapper;

    public UserService(UserDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<bool> CheckIfUserExists(string username)
    {
        var res = await _context.Users.AnyAsync(u => u.UserName == username);
        
        return res;
    }

    public async Task<bool> CheckEmailExistsAsync(string email)
    {
        var res = await _context.Users.AnyAsync(u => u.Email == email);
        
        return res;
    }

    public async Task<string> GetIdByEmailAsync(string email)
    {
        var res = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (res == null)
        {
            throw new Exception("User not found");
        }

        return res.Id;
    }
    
    public async Task<User> GetUserByEmailAsync(string email)
    {
        var res = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (res == null)
        {
            throw new Exception("User not found");
        }

        return res;
    }
}