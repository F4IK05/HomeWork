using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AuthApi.Data.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AuthApi.Application.Utils;

public class TokenManager
{
    private readonly IConfiguration _configuration;

    public TokenManager(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<string> CreateAccessTokenAsync(User user, List<string> roles)
    {
        // инфа, которая будет включена в токен(то есть в токене будет UserName, Email)
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email)
        };

        // Добавление ролей в токен
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }
        
        // Secret key для подписи
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWT:SecretKey").Value));
        
        // Указвается что будет использоваться HMAC-SHA256 для подписи токена
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

        // Создание самого токена, указывается:
        var securityToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(int.Parse(_configuration.GetSection("JWT:ExpiresInMinutes").Value)),
            issuer: _configuration.GetSection("JWT:Issuer").Value,
            audience: _configuration.GetSection("JWT:Audience").Value,
            signingCredentials: credentials);
        
        // Преобразование токена в строку
        string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
        
        return tokenString;
    }

    public async Task<string> GenerateRefreshToken()
    {
        var randomBytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToBase64String(randomBytes);
    }
    
    public async Task<string> CreateEmailTokenAsync(ClaimsPrincipal user)
    {
        var claim = user.Claims.Where(c => c.Type == ClaimTypes.Email);

        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration.GetSection("JWT:EmailKey").Value));

        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

        var securityToken = new JwtSecurityToken(
            claims: claim,
            expires: DateTime.UtcNow.AddMinutes(3),
            issuer: _configuration.GetSection("JWT:Issuer").Value,
            audience: _configuration.GetSection("JWT:Audience").Value,
            signingCredentials: credentials);

        string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);

        return tokenString;
    }

    public async Task<bool> ValidateEmailTokenAsync(string token)
    {
        // токен-хэндлер - объект, умеющий читать, валидировать и декодировать JWT
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWT:EmailKey").Value));

        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _configuration.GetSection("JWT:Issuer").Value,
            ValidAudience = _configuration.GetSection("JWT:Audience").Value,
            IssuerSigningKey = securityKey,
        };
        
        var principal = await tokenHandler.ValidateTokenAsync(token, validationParameters);
        return principal.IsValid;
    }

    public string GetEmailFromToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

        if (securityToken == null)
        {
            throw new SecurityTokenException("Invalid token");
        }

        var email = securityToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
        
        return email.Value;
    }
    
    public string HashRefreshToken(string refreshToken)
    {
        // хранить в БД только хэш (как пароли)
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(refreshToken));
        return Convert.ToBase64String(bytes);
    }
    
    public IEnumerable<Claim> BuildUserClaims(User user, IEnumerable<string> roles)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email)
        };
        foreach (var r in roles) claims.Add(new Claim(ClaimTypes.Role, r));
        return claims;
    }
}