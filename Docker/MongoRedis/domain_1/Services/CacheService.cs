using System.Text.Json;
using StackExchange.Redis;

namespace domain_1.Services;

public class CacheService : ICacheService
{
    private readonly IDatabase _db;

    public CacheService(IConnectionMultiplexer redis)
    {
        _db = redis.GetDatabase();
    }

    public async Task<T?> GetAsync<T>(string key)
    {
        var cached = await _db.StringGetAsync(key);

        if (!cached.HasValue) return default;

        return JsonSerializer.Deserialize<T>(cached!);
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan timeSpan)
    {
        await _db.StringSetAsync(key, JsonSerializer.Serialize(value), timeSpan);
    }
}