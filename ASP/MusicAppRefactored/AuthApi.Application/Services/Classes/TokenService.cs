using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthApi.Application.Services.Interfaces;
using AuthApi.Data.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace AuthApi.Application.Services.Classes;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    public async Task<string> CreateTokenAsync(User user, List<string> userRoles)
    {
        // инфа, которая будет включена в токен(то есть в токене будет UserName, Email)
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim("name", user.UserName),
            new Claim("email", user.Email),
        };

        // Добавление ролей в токен
        foreach (var role in userRoles)
        {
            claims.Add(new Claim("role", role));
        }
        
        // Secret key для подписи
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWT:SecretKey").Value));
        
        // Указвается что будет использоваться HMAC-SHA256 для подписи токена
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
        
        // Создание самого токена, указывается:
        var securityToken = new JwtSecurityToken(
            claims: claims, // список Claim-ов
            expires: DateTime.UtcNow.AddMinutes(15), // время жизни токена (15 минут)
            issuer: _configuration.GetSection("JWT:Issuer").Value, // кто выдал
            audience: _configuration.GetSection("JWT:Audience").Value, // кому выдал
            signingCredentials: credentials); // подпись токена
        
        // Преобразование токена в строку
        string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
        
        return tokenString;
    }

    public async Task<string> CreateEmailTokenAsync(ClaimsPrincipal user)
    {
        // получение Claim-ов пользователя по email-у и далее...
        var claim = user.Claims.Where(c => c.Type == ClaimTypes.Email);
        
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWT:EmailKey").Value));
        
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
        
        var securityToken = new JwtSecurityToken(
            claims: claim, // записывается в токен
            expires: DateTime.UtcNow.AddMinutes(3),
            issuer: _configuration.GetSection("JWT:Issuer").Value,
            audience: _configuration.GetSection("JWT:Audience").Value,
            signingCredentials: credentials);
        // то есть создал токен на основе email-а
        
        string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
        
        return tokenString;
    }

    public async Task<string> GetEmailFromTokenAsync(string token)
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
}