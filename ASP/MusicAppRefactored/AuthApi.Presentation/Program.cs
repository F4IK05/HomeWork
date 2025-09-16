using AuthApi.Presentation.Extensions;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

app.UseApplicationMiddleware();

app.Run();