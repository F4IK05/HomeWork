using System.Text;
using AuthApi.Application.Services.Classes;
using AuthApi.Application.Services.Interfaces;
using AuthApi.Application.Utils;
using AuthApi.Infrastructure.Configurations;
using AuthApi.Infrastructure.Contexts;
using AuthApi.Infrastructure.MappingConfigurations;
using AuthApi.Infrastructure.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace AuthApi.Presentation.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddOpenApi();
        services.AddControllers();
        
        // DbContext
        services.AddDbContext<UserDbContext>(ops =>
            ops.UseSqlServer(config.GetConnectionString("Default")));

        // AuthService
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IAccountService, AccountService>();
        services.AddScoped<IUserRoleService, UserRoleService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<TokenManager>();
        services.AddScoped<EmailSender>();
        
        services.AddHttpClient<IGoogleAuthService, GoogleAuthService>();
        
        services.AddSingleton<GlobalExceptionMiddleware>();
        
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        
        // Регистрация CORS политики
        services.AddCors(opt =>
        {
            opt.AddPolicy("AllowFront", policy =>
            {
                policy.WithOrigins("http://localhost:5173") // мой React проект
                    .AllowAnyHeader() // 
                    .AllowAnyMethod();
            });
        });

        services.AddAuthentication(options =>
        {
            // схема аутентификации по умолчанию
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            
            // схема вызова по умолчанию
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true, // проверять издателя токена 
                ValidateAudience = true, // проверять получателя
                ValidateLifetime = true, // проверять срок 
                ValidateIssuerSigningKey = true, // проверять подпись токена

                ValidIssuer = config["JWT:Issuer"],
                ValidAudience = config["JWT:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(config["JWT:SecretKey"])),

                // чтобы токен не мог работать чуть дольше после просрочки
                ClockSkew = TimeSpan.Zero
            };
        });

        return services;
    }
}