using Microsoft.EntityFrameworkCore;
using ms_identity.Data;
using ms_identity.Endpoints;
using ms_identity.Services;
using Scalar.AspNetCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

// ENV
var postgresConn = Environment.GetEnvironmentVariable("POSTGRES_CONNECTION");
var redisConn = Environment.GetEnvironmentVariable("REDIS_CONNECTION");

// Postgres
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseNpgsql(postgresConn));

// Redis
builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConn));
builder.Services.AddSingleton<ICacheService, CacheService>();

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.MapUsers();
app.MapOpenApi();
app.MapScalarApiReference();

app.Run();