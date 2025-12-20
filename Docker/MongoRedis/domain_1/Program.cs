using System.Text.Json;
using domain_1.Endpoints;
using domain_1.Repositories;
using domain_1.Services;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Scalar.AspNetCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

// ENV
var mongoConn = Environment.GetEnvironmentVariable("MONGO_CONNECTION");
var redisConn = Environment.GetEnvironmentVariable("REDIS_CONNECTION");

// MongoDB
builder.Services.AddSingleton<IMongoClient>(new MongoClient(mongoConn));

// Redis
builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConn));

builder.Services.AddSingleton<IItemRepository, ItemRepository>();
builder.Services.AddSingleton<ICacheService, CacheService>();

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.MapOpenApi();
app.MapItemsEndpoints();
app.MapScalarApiReference();

app.Run();

