using System.Security.Claims;
using System.Text.RegularExpressions;
using AuthApi.Application.Services.Interfaces;
using AuthApi.Contracts.DTOs.Requests.Profile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthApi.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;
    private readonly IAuthService _authService;
    private readonly IUserService _userService;

    public AccountController(IAccountService accountService, IUserService userService, IAuthService authService)
    {
        _accountService = accountService;
        _userService = userService;
        _authService = authService;
    }
    
    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetProfile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Console.WriteLine(userId);
        
        var user = await _accountService.GetProfileAsync(userId);
        if (user == null)
            return NotFound("User not found");
        
        return Ok(user);
    }
    
    [Authorize]
    [HttpPut("update")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequestDto request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        var user = await _accountService.UpdateProfileAsync(userId, request);
        return Ok(user);
    }

    [Authorize]
    [HttpPost("security/change-password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordRequestDto request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        var res = await _accountService.ChangePasswordAsync(userId, request);
        
        return Ok(res);
    }
    
    [Authorize]
    [HttpPost("security/change-email")]
    public async Task<IActionResult> ChangeEmail([FromBody] ChangeEmailRequestDto request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        await _accountService.ChangeEmailAsync(userId, request);
        return Ok(new { message = "Email changed successfully" });
    }
    
    [Authorize]
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteAccount([FromBody] DeleteAccountRequestDto request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        
        await _accountService.DeleteAccountAsync(userId, request.Password);
        return Ok(new { message = "Account deleted" });
    }
    
    // Проверка логина
    [HttpGet("CheckUser")]
    public async Task<IActionResult> CheckUser(string username)
    {
        bool isExists = await _userService.CheckIfUserExists(username);
        return Ok(isExists); // true = можно использовать
    }

    // Проверка email
    [HttpGet("CheckEmail")]
    public async Task<IActionResult> CheckEmail(string email)
    {
        var pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        if (!Regex.IsMatch(email, pattern))
            return BadRequest("Invalid email");

        bool isExists = await _userService.CheckEmailExistsAsync(email);
        return Ok(!isExists); // true = можно использовать
    }

    // Проверка email-подтверждения
    [Authorize]
    [HttpGet("VerificationStatus")]
    public async Task<IActionResult> VerificationStatus()
    {
        var email = User.FindFirst(ClaimTypes.Email)?.Value;
        var user = await _userService.GetUserByEmailAsync(email);
        if (user == null)
            return Unauthorized("User not found");

        return Ok(new { isEmailVerified = user.IsConfirmed });
    }

    // Проверка, есть ли у пользователя пароль (для Google-пользователей)
    [Authorize]
    [HttpGet("HasPassword")]
    public async Task<IActionResult> HasPassword()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized(new { hasPassword = false });

        var hasPassword = await _accountService.HasPasswordAsync(userId);
        return Ok(new { hasPassword });
    }
}