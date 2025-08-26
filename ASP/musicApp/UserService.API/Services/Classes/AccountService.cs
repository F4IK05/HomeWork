using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserService.API.DTOs.GoogleAuthDTOs;
using UserService.API.DTOs.Requests;
using UserService.API.DTOs.Response;
using UserService.API.Services.Interfaces;
using UserService.Data.Data.Contexts;
using UserService.Data.Data.Models;
using static BCrypt.Net.BCrypt;

namespace UserService.API.Services.Classes;

public class AccountService : IAccountService
{
    private readonly UserDbContext _context;
    private readonly IMapper _mapper;
    private readonly IWebHostEnvironment _env;
    private readonly EmailSender _emailSender;
    private readonly IUserService _userService;
    private readonly ITokenService _tokenService;

    public AccountService(UserDbContext context, IMapper mapper, IWebHostEnvironment env, EmailSender emailSender, IUserService userService, ITokenService tokenService)
    {
        _context = context;
        _mapper = mapper;
        _env = env;
        _emailSender = emailSender;
        _userService = userService;
        _tokenService = tokenService;
    }

    public async Task<Result> RegisterAsync(RegisterRequestDTO request)
    {
        var newUser = _mapper.Map<User>(request);
        
        newUser.Password = HashPassword(request.Password);
        
        _context.Users.Add(newUser);
        
        await AssignRoleToUserAsync(newUser.Id);
        
        await _context.SaveChangesAsync();
        
        return Result.Success();
    }

    public async Task<string> RegisterGoogleAsync(GoogleUserInfo userInfo, string chosenUserName)
    {
        if (await _context.Users.AnyAsync(u => u.GoogleId == userInfo.Id))
        {
            throw new Exception("User with this Google account already exists");
        }
        
        var existingUserByEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == userInfo.Email);
        if (existingUserByEmail != null)
        {
            throw new Exception("Email already registered. Please log in");
        }

        if (await _userService.CheckIfUserExists(chosenUserName))
        {
            throw new Exception("User already exists");
        }
        
        var user = _mapper.Map<User>(userInfo);
        
        user.UserName = chosenUserName;

        user.Password = HashPassword(Guid.NewGuid().ToString());
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        
        var userRoles = await _context.UserRoles
            .Where(ur => ur.UserId == user.Id)
            .Include(ur => ur.Role)
            .Select(ur => ur.Role.Name).ToListAsync();

        
        var accessToken = await _tokenService.CreateTokenAsync(user, userRoles);

        return accessToken;
    }

    public async Task ConfirmEmailAsync(ClaimsPrincipal userClaims, string token, HttpContext context)
    {
        var email = userClaims.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;      
        
        // ищет пользователя с указанной почтой
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        
        // путь к html-шаблону
        var filePath = Path.Combine(_env.WebRootPath, "ConfirmMessage.html");
        // _env.WebRootPath - беру путь до папки wwwroot и в нем ищу ConfirmMessage.html
        
        // чтение htm   l-шаблона(весь файл считывается в строку)
        var msgContent = new StringBuilder(await File.ReadAllTextAsync(filePath));
        
        // ссылка
        var confirmLink = $"{context.Request.Scheme}://{context.Request.Host}/api/Account/Verify/{user.Id}/{token}";
        // 1. Request.Scheme - протокол запроса(http или https)
        // 2. Request.host - домен + порт (example.com или localhost:5001)
        
        
        msgContent.Replace("{User}", user.UserName);
        msgContent.Replace("{ConfirmationLink}", confirmLink);
        
        await _emailSender.SendEmailAsync(user.Email, "Confirm Email", msgContent.ToString());
    }

    public async Task<Result> VerifyEmailAsync(string id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            throw new Exception($"User with id {id} not found");
        }

        user.isConfirmed = true;
        
        await RemoveRoleFromUserAsync(user.Id, "Guest");
        await AssignRoleToUserAsync(user.Id, "User");
        
        await _context.SaveChangesAsync();
        return Result.Success("Email verified");
    }

    public async Task<Result> ChangePasswordAsync(string userId, string currentPassword, string newPassword)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null)
        {
            throw new Exception($"User with id {userId} not found");
        }

        if (!Verify(user.Password, currentPassword))
        {
            throw new Exception($"Current password is incorrect.");
        }

        user.Password = HashPassword(newPassword);
        
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return Result.Success("Password changed");
    }

    public async Task<IActionResult> ChangeEmailAsync(string userId, string newEmail, string token)
    {
        throw new NotImplementedException();
    }

    public async Task AssignRoleToUserAsync(string userId, string roleName = "Guest")
    {
        var role = await _context.Roles.FirstAsync(r => r.Name == roleName);

        if (userId == null)
        {
            throw new Exception($"User with id {userId} not found");
        }

        if (role == null)
        {
            throw new Exception($"Role with name {roleName} not found");
        }

        _context.UserRoles.Add(new UserRole { UserId = userId, RoleId = role.Id });
        
        await _context.SaveChangesAsync();
    }

    public async Task RemoveRoleFromUserAsync(string userId, string roleName)
    {
        var role = await _context.Roles.FirstAsync(r => r.Name == roleName);

        if (role == null)
        {
            throw new Exception($"Role with name {roleName} not found");
        }

        var userRole = await _context.UserRoles.FirstOrDefaultAsync(ur => ur.UserId == userId && ur.RoleId == role.Id);

        if (userRole != null)
        {
            _context.UserRoles.Remove(userRole);
            
            await _context.SaveChangesAsync();
        }

    }
    
}