using System.Security.Claims;
using AuthApi.Application.Services.Interfaces;
using AuthApi.Application.Utils;
using AuthApi.Contracts.DTOs.Google;
using AuthApi.Contracts.DTOs.Requests.Auth;
using AuthApi.Data.Models;
using AuthApi.Infrastructure.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly TokenManager _tokenManager;
    private readonly IUserService _userService;
    private readonly IWebHostEnvironment _env;
    private readonly IGoogleAuthService _googleAuthService;
    private readonly UserDbContext _context;

    public AuthController(IAuthService authService, TokenManager tokenManager, IUserService userService, IWebHostEnvironment env, IGoogleAuthService googleAuthService, UserDbContext context)
    {
        _authService = authService;
        _tokenManager = tokenManager;
        _userService = userService;
        _env = env;
        _googleAuthService = googleAuthService;
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
    {
        var res = await _authService.RegisterAsync(request);
        
        return Ok(res);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        var res = await _authService.LoginAsync(request);
        
        return Ok(res);
    }
    
    [HttpGet("google/login")]
    public async Task<IActionResult> GoogleLoginAsync()
    {
        var url = _googleAuthService.GenerateGoogleAuthUrl("http://localhost:5173/auth/google");
   
        return Redirect(url);
    }
    
    [HttpPost("google/callback")]
    public async Task<IActionResult> GoogleCallback([FromQuery] string code)
    {
        Console.WriteLine(code);
        
        try
        {
            var tokens = await _googleAuthService.ExchangeCodeOnTokenAsync(code, "http://localhost:5173/auth/google");
            var userInfo = await _googleAuthService.GetUserInfoAsync(tokens.Token);
    
            // 1. Ищем OAuth-связку
            var oauth = await _context.UserOAuths
                .Include(o => o.User)
                .FirstOrDefaultAsync(o => o.Provider == "Google" && o.ProviderUserId == userInfo.Id);
    
            if (oauth != null)
            {
                var user = oauth.User;

                var authResult = await _authService.ExternalTokenHelperAsync(user);
                
                return Ok(new
                {
                    success = true,
                    isNewUser = false,
                    data = new
                    {
                        accessToken = authResult.Data?.Token,
                        email = authResult.Data?.Email,
                        userName = authResult.Data?.UserName,
                        picture = authResult.Data?.AvatarUrl
                    }
                });
            }
    
            // 2. Если OAuth нет — ищем по email
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == userInfo.Email);
    
            if (existingUser != null)
            {
                // Привязываем новый OAuth
                var newOAuth = new UserOAuth
                {
                    Provider = "Google",
                    ProviderUserId = userInfo.Id,
                    UserId = existingUser.Id
                };
    
                _context.UserOAuths.Add(newOAuth);
                await _context.SaveChangesAsync();
    
                var authResult = await _authService.ExternalTokenHelperAsync(existingUser);
                
                return Ok(new
                {
                    success = true,
                    isNewUser = false,
                    data = new
                    {
                        accessToken = authResult.Data?.Token,
                        email = authResult.Data?.Email,
                        userName = authResult.Data?.UserName,
                        picture = authResult.Data?.AvatarUrl
                    }
                });
            }
            
            return Ok(new
            {
                success = true,
                isNewUser = true,
                data = new
                {
                    email = userInfo.Email,
                    suggestedUserName = userInfo.Name,
                    googleId = userInfo.Id,
                    name = userInfo.Name,
                    picture = userInfo.Picture
                }
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, error = ex.Message });
        }
    }     
    
    [HttpPost("google/register")]
    public async Task<IActionResult> RegisterGoogleUser([FromBody] GoogleRegisterDto request)
    {
        try
        {
            // Проверяем, нет ли уже пользователя с такой почтой
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.UserInfo.Email);
            if (existingUser != null)
            {
                return BadRequest(new { success = false, error = "User already exists." });
            }
    
            // Создаём нового пользователя
            var newUser = new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = request.UserInfo.Email,
                UserName = request.ChosenUserName,
                AvatarUrl = request.UserInfo.Picture,
                IsConfirmed = true, // Google уже подтвердил email
                CreatedAt = DateTime.UtcNow
            };
    
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
    
            // Привязываем OAuth
            var oauth = new UserOAuth
            {
                Provider = "Google",
                ProviderUserId = request.UserInfo.Id,
                UserId = newUser.Id
            };
    
            await _context.UserOAuths.AddAsync(oauth);
            await _context.SaveChangesAsync();
    
            // Получаем роли (по умолчанию "User")
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
            if (role != null)
            {
                _context.UserRoles.Add(new UserRoles { UserId = newUser.Id, RoleId = role.Id });
                await _context.SaveChangesAsync();
            }
    
            // Создаём JWT токен
            var userRoles = new List<string> { "User" };
            var accessToken = await _tokenManager.CreateAccessTokenAsync(newUser, userRoles);
    
            return Ok(new
            {
                success = true,
                data = new
                {
                    accessToken,
                    userName = newUser.UserName,
                    email = newUser.Email,
                    picture = newUser.AvatarUrl
                }
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, error = ex.Message });
        }
    }



    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var res = await _authService.RefreshTokenAsync();
        
        return Ok(res);
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var res = await _authService.LogoutAsync();
        
        return Ok(res);
    }
    
    [Authorize]
    [HttpPost("confirm")]
    public async Task<IActionResult> ConfirmEmailAsync()
    {
        var email = User.FindFirst(ClaimTypes.Email)?.Value ??
                    User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

        Console.WriteLine($"[ConfirmEmail] Email claim: {email ?? "NULL"}");

        if (string.IsNullOrEmpty(email))
            return BadRequest("Email not found in token");

        var token = await _tokenManager.CreateEmailTokenAsync(User);
        var user = await _userService.GetUserByEmailAsync(email);

        if (user == null)
            return BadRequest("User not found");

        if (user.IsConfirmed)
            return BadRequest("Email already confirmed");

        Console.WriteLine($"[ConfirmEmail] Sending confirmation email to {email}...");
        await _authService.SendConfirmationEmailAsync(User, token, HttpContext);
        Console.WriteLine($"[ConfirmEmail] Email sent!");

        return Ok("Email confirmation sent");
    }

    [HttpGet("verify")]
    public async Task<IActionResult> VerifyEmailAsync(string token, string lang = "en")
    {
        var res = await _authService.VerifyEmailAsync(token);

        if (!res.IsSuccess)
        {
            return BadRequest(res.Message);
        }

        var successPath = Path.Combine(_env.WebRootPath, $"email-confirmed.{lang}.html");
        return PhysicalFile(successPath, "text/html");
    }
    
    
}