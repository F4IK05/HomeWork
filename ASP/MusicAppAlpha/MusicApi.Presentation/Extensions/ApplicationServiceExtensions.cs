using System.Text;
using Amazon;
using Amazon.S3;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MusicApi.Application.Services;
using MusicApi.Infrastructure.Contexts;
using MusicApi.Infrastructure.Repositories.Services.Classes;
using MusicApi.Infrastructure.Repositories.Services.Interfaces;

namespace MusicApi.Presentation.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddOpenApi();
        services.AddControllers();

        // DbContext
        services.AddDbContext<MusicDbContext>(options =>
            options.UseSqlServer(config.GetConnectionString("Default")));

        // Репозитории
        services.AddScoped<ISongRepository, SongRepository>();

        // Основные сервисы
        services.AddScoped<MusicService>();
        services.AddScoped<S3Service>();

        // AWS
        var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY");
        var secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_KEY");
        var region = Environment.GetEnvironmentVariable("AWS_REGION");

        var s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.GetBySystemName(region));
        services.AddSingleton<IAmazonS3>(s3Client);


        // Глобальное исключение (если будет аналогичный middleware)
        // services.AddSingleton<GlobalExceptionMiddleware>();

        // CORS
        services.AddCors(opt =>
        {
            opt.AddPolicy("AllowFront", policy =>
            {
                policy.WithOrigins("http://localhost:5173") // твой React проект
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        // JWT (если планируется авторизация через AuthApi)
        // services.AddAuthentication(options =>
        // {
        //     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        //     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        // })
        // .AddJwtBearer(options =>
        // {
        //     options.TokenValidationParameters = new TokenValidationParameters
        //     {
        //         ValidateIssuer = true,
        //         ValidateAudience = true,
        //         ValidateLifetime = true,
        //         ValidateIssuerSigningKey = true,
        //
        //         ValidIssuer = config["JWT:Issuer"],
        //         ValidAudience = config["JWT:Audience"],
        //         IssuerSigningKey = new SymmetricSecurityKey(
        //             Encoding.UTF8.GetBytes(config["JWT:SecretKey"])),
        //
        //         ClockSkew = TimeSpan.Zero
        //     };
        // });

        return services;
    }
}