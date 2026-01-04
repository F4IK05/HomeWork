using System.Security.Claims;
using Contracts.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Stores;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly InMemoryUserStore _store;
    private readonly TokenService _tokenService;

    public AuthController(InMemoryUserStore store, TokenService tokenService)
    {
        _store = store;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public ActionResult<AuthResponse> Register([FromBody] RegisterRequest request)
    {
        var email = NormalizeEmail(request.Email);

        if (string.IsNullOrWhiteSpace(request.Username))
            return BadRequest(new { message = "Username is required" });

        if (request.Password.Length < 6)
            return BadRequest(new { message = "Password must be at least 6 chars" });

        if (_store.FindByEmail(email) != null)
            return BadRequest(new { message = "User already exists" });

        var user = new User
        {
            Email = email,
            Username = request.Username.Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        var refresh = _tokenService.GenerateRefreshToken();
        user.RefreshTokenHash = _tokenService.HashRefreshToken(refresh);
        user.RefreshTokenExpiresAtUtc = _tokenService.RefreshExpiresAtUtc();

        _store.AddUser(user);

        var access = _tokenService.GenerateAccessToken(user);
        return Ok(new AuthResponse(access, refresh, user.Id.ToString(), user.Email, user.Username));
    }

    [HttpPost("login")]
    public ActionResult<AuthResponse> Login(LoginRequest request)
    {
        var email = NormalizeEmail(request.Email);

        var user = _store.FindByEmail(email);

        if (user == null) return Unauthorized();

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Unauthorized();

        var refresh = _tokenService.GenerateRefreshToken();
        user.RefreshTokenHash = _tokenService.HashRefreshToken(refresh);
        user.RefreshTokenExpiresAtUtc = _tokenService.RefreshExpiresAtUtc();

        var access = _tokenService.GenerateAccessToken(user);
        return Ok(new AuthResponse(access, refresh, user.Id.ToString(), user.Email, user.Username));
    }

    [HttpPost("refresh")]
    public IActionResult Refresh(RefreshRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.RefreshToken))
            return BadRequest(new { message = "RefreshToken is required" });

        var hash = _tokenService.HashRefreshToken(request.RefreshToken);
        var user = _store.FindByRefreshHash(hash);
        if (user == null) return Unauthorized();

        if (user.RefreshTokenExpiresAtUtc == null || user.RefreshTokenExpiresAtUtc < DateTime.UtcNow)
            return Unauthorized(new { message = "Refresh token expired" });

        var newRefresh = _tokenService.GenerateRefreshToken();
        user.RefreshTokenHash = _tokenService.HashRefreshToken(newRefresh);
        user.RefreshTokenExpiresAtUtc = _tokenService.RefreshExpiresAtUtc();

        var newAccess = _tokenService.GenerateAccessToken(user);
        return Ok(new { accessToken = newAccess, refreshToken = newRefresh });
    }

    [Authorize]
    [HttpGet("me")]
    public IActionResult Me()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var email = User.FindFirstValue(ClaimTypes.Email);
        var username = User.FindFirstValue(ClaimTypes.Name);

        return Ok(new { id, email, username });
    }

    private static string NormalizeEmail(string email) =>
        email.Trim().ToLowerInvariant();
}