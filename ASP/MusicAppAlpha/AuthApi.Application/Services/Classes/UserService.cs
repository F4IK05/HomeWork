﻿using AuthApi.Application.Services.Interfaces;
using AuthApi.Data.Models;
using AuthApi.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Application.Services.Classes;

public class UserService : IUserService
{
    private readonly UserDbContext _context;

    public UserService(UserDbContext context)
    {
        _context = context;
    }
    
    public async Task<bool> CheckIfUserExists(string username)
    {
        return await _context.Users.AnyAsync(u => u.UserName == username);
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