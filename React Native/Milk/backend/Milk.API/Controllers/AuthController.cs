using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Milk.API.DTOs.Request.Auth;
using Milk.API.DTOs.Response.Auth;
using Milk.API.Services.Interfaces.Auth;

namespace Milk.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterRequestDto request)
    {
        var res = await _authService.RegisterAsync(request);
        
        return Ok(res);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginRequestDto request)
    {
        var res = await _authService.LoginAsync(request);
        
        return Ok(res);
    }
    
    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<MeResponseDto>> GetMe()
    {
        var me = await _authService.GetMeAsync(User);
        
        return Ok(me);
    }
    
    [HttpGet("check-email")]
    public async Task<ActionResult<CheckEmailResponseDto>> CheckEmail([FromQuery] string email)
    {
        var isAvailable = await _authService.IsEmailAvailableAsync(email);

        return Ok(new CheckEmailResponseDto
        {
            IsAvailable = isAvailable
        });
    }
}