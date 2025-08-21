using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using UserService.API.Middlewares;
using UserService.API.Services.Classes;
using UserService.API.Services.Interfaces;
using UserService.Data.Data.Contexts;

namespace UserService.API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddOpenApi();
        services.AddControllers();
        
        services.AddDbContext<UserDbContext>(ops => 
            ops.UseSqlServer(configuration.GetConnectionString("Default")));

        services.AddScoped<IAccountService, AccountService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IGoogleAuthService, GoogleAuthService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IRoleService, RoleService>();
        services.AddScoped<IUserService, Services.Classes.UserService>();
        services.AddScoped<EmailSender>();
        
        services.AddHttpClient<GoogleAuthService>();
        
        services.AddSingleton<GlobalExceptionMiddleware>();

        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        
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
        
        services.AddAuthentication(opt =>
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(opt =>
        {
            opt.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = configuration["JWT:Issuer"],
                ValidAudience = configuration["JWT:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(configuration["JWT:SecretKey"])),
                
                NameClaimType = "name",
                RoleClaimType = "role"
            };
        });
        services.AddAuthorization(ops =>
        {
            ops.AddPolicy("UserPolicy", builder => builder.RequireRole("User", "PremiumUser", "Admin"));
            ops.AddPolicy("AdminPolicy", builder => builder.RequireRole("Admin"));
            // еще будут
        });

        return services;
    }
}