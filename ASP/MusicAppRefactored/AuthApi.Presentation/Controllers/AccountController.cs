using System.Security.Claims;
using System.Text.RegularExpressions;
using AuthApi.Application.Services.Interfaces;
using AuthApi.Contracts.DTOs.Requests;
using AuthApi.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AuthApi.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;
    private readonly ITokenService _tokenService;
    private readonly IUserService _userService;
    private readonly IAuthService _authService;

    public AccountController(IAccountService accountService, ITokenService tokenService, IUserService userService, IAuthService authService)
    {
        _accountService = accountService;
        _tokenService = tokenService;
        _userService = userService;
        _authService = authService;
    }

    [HttpPost("Register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterRequestDto request)
    {
        var res = await _accountService.RegisterAsync(request);
        
        return Ok(res);
    }
    
    [HttpPost("google/register")]
    public async Task<IActionResult> RegisterGoogleUser([FromBody] GoogleRegisterRequestDto request)
    {
        try
        {
            var accessToken = await _accountService.RegisterGoogleAsync(request.UserInfo, request.ChosenUserName);

            return Ok(new
            {
                success = true,
                data = new
                {
                    AccessToken = accessToken,
                    UserName = request.ChosenUserName,
                    Email = request.UserInfo.Email,
                    Picture = request.UserInfo.Picture
                }
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, error = ex.Message });
        }
    }

    [Authorize]
    [HttpPost("LinkPassword")]
    public async Task<IActionResult> LinkPassword([FromBody]LinkPasswordRequestDto request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        if (string.IsNullOrEmpty(userId))
        {
            Console.WriteLine("UserId is null or empty");
            return BadRequest("User not authenticated");
        }
        
        var result = await _accountService.LinkPasswordToAccountAsync(userId, request.Password);

        if (!result.IsSuccess)
        {
            return BadRequest(new { success = false, message = result.Message });
        }
        
        return Ok(new { success = true, message = "Password linked successfully" });

    }

    [Authorize]
    [HttpPost("ChangePassword")]
    public async Task<IActionResult> ChangePassword(ChangePasswordRequestDto request)
    {
        try
        {
            // Логирование входящих данных
            Console.WriteLine($"=== ChangePassword Request ===");
            Console.WriteLine($"Request is null: {request == null}");
            
            if (request != null)
            {
                Console.WriteLine($"CurrentPassword is null/empty: {string.IsNullOrEmpty(request.CurrentPassword)}");
                Console.WriteLine($"NewPassword is null/empty: {string.IsNullOrEmpty(request.NewPassword)}");
                Console.WriteLine($"CurrentPassword length: {request.CurrentPassword?.Length ?? 0}");
                Console.WriteLine($"NewPassword length: {request.NewPassword?.Length ?? 0}");
            }

            // Проверка авторизации
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Console.WriteLine($"UserId from token: {userId}");
            Console.WriteLine($"User.Identity.IsAuthenticated: {User.Identity?.IsAuthenticated}");

            if (string.IsNullOrEmpty(userId))
            {
                Console.WriteLine("UserId is null or empty");
                return BadRequest("User not authenticated");
            }

            if (request == null)
            {
                Console.WriteLine("Request is null");
                return BadRequest("Request data is required");
            }

            if (string.IsNullOrEmpty(request.CurrentPassword) || string.IsNullOrEmpty(request.NewPassword))
            {
                Console.WriteLine("Current or new password is empty");
                return BadRequest("Current password and new password are required");
            }

            var result = await _accountService.ChangePasswordAsync(userId, request.CurrentPassword, request.NewPassword);
            
            Console.WriteLine($"Service result - IsSuccess: {result.IsSuccess}");
            
            if (result.IsSuccess)
            {
                return Ok(new { message = "Password changed successfully" });
            }
            
            Console.WriteLine($"Service error: {result.Message}");
            return BadRequest(new { message = result.Message });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception in ChangePassword: {ex.Message}");
            Console.WriteLine($"StackTrace: {ex.StackTrace}");
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("CheckUser")]
    public async Task<IActionResult> CheckUser(string username)
    {
        bool isExsists = await _userService.CheckIfUserExists(username);

        if (isExsists)
        {
            return Ok(false);
        }
        
        return Ok(true);
    }

    [HttpGet("CheckEmail")]
    public async Task<IActionResult> CheckEmail(string email)
    {
        var emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

        if (!Regex.IsMatch(email, emailPattern))
        {
            return BadRequest("Invalid email"); 
        }
        
        bool isExists = await _userService.CheckEmailExistsAsync(email);

        if (isExists)
        {
            return Ok(false); // Email существует - нельзя использовать
        }
        return Ok(true);
    }

    [Authorize]
    [HttpGet("HasPassword")]
    public async Task<IActionResult> HasPassword()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized(new { hasPassword = false });
        }
        
        var hasPassword = await _accountService.HasPasswordAsync(userId);
        return Ok(new { hasPassword });
    }

    [Authorize]
    [HttpPost("Confirm")]
    public async Task<IActionResult> ConfirmEmailAsync()
    {
        var email = User.FindFirst(ClaimTypes.Email)?.Value;
        
        var token = await _tokenService.CreateEmailTokenAsync(User);
        
        var user = await _userService.GetUserByEmailAsync(email);
        if (user.isConfirmed)
        {
            return BadRequest("Email already confirmed");
        }

        await _accountService.ConfirmEmailAsync(User, token, HttpContext);
        
        return Ok("Email confirmation sent");
    }

    [HttpGet("Verify/{id}/{token}")]
    public async Task<IActionResult> VerifyEmailAsync(string id, string token)
    {
        var res = await _tokenService.ValidateEmailTokenAsync(token);

        if (!res)
        {
            throw new Exception("Error");
        }

        var emailFromToken = await _tokenService.GetEmailFromTokenAsync(token);
        
        var idFromEmail = await _userService.GetIdByEmailAsync(emailFromToken);

        if (id == idFromEmail)
        {
            return Ok(await _accountService.VerifyEmailAsync(id));
        }

        throw new Exception("Error");
    }

    [Authorize]
    [HttpGet("VerificationStatus")]
    public async Task<IActionResult> GetVerificationStatusAsync()
    {
        var email = User.FindFirst(ClaimTypes.Email)?.Value;
        var user = await _userService.GetUserByEmailAsync(email);
        
        if (user == null)
        {
            return Unauthorized("User not found");
        }

        return Ok(new { isEmailVerified = user.isConfirmed });
    }
}