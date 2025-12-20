using domain_2.Data;
using domain_2.Endpoints;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var postgresConn = Environment.GetEnvironmentVariable("POSTGRES_CONNECTION");

builder.Services.AddDbContext<OrdersDbContext>(opt => opt.UseNpgsql(postgresConn));
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// создаст таблицу автоматически
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<OrdersDbContext>();
    db.Database.EnsureCreated();
}

app.MapOpenApi();
app.MapOrders();
app.MapScalarApiReference();

app.Run();
