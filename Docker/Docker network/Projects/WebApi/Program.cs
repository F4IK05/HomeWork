using Microsoft.EntityFrameworkCore;
using WebApi.Data;

var builder = WebApplication.CreateBuilder(args);

var cs = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrWhiteSpace(cs))
    throw new Exception("ConnectionStrings__DefaultConnection is not set");

builder.Services.AddDbContext<AppDbContext>(opt => opt.UseNpgsql(cs));
builder.Services.AddControllers();

var app = builder.Build();
app.MapControllers();
app.Run();
