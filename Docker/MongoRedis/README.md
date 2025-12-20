## Как работает, Lazy Loading?

На примере `ms-identity`, файл `UsersEndpoints`.

Фрагмент кода:

```csharp
app.MapGet("/users/{id:int}", async (int id, AppDbContext db,ICacheService cache) =>
{
    var key = $"user:{id}";

    var cached = await cache.GetAsync<UserPublic>(key);
    
    if (cached != null) return Results.Ok(new { source = "redis", data = cached });

    var user = await db.Users.FirstOrDefaultAsync(u => u.Id == id);

    if (user == null) return Results.NotFound();

    var dto = new UserPublic(user.Id, user.Login);

    await cache.SetAsync(key, dto, TimeSpan.FromMinutes(5));

    return Results.Ok(new { source = "postgres", data = dto });
});
```

Что происходит в коде:

- **var key = $"user:{id}"** - создаеm ключ для кэша (Redis).

- **var cached = await cache.GetAsync<UserPublic>(key);** - попытка получить данные из кэша.

- **if (cached != null) return Results.Ok(new { source = "redis", data = cached });** - если данные есть в кэше, то возвращаем их.

- **var user = await db.Users.FirstOrDefaultAsync(u => u.Id == id);** - если данных нет в кэше, то получаем их из базы данных.

- **await cache.SetAsync(key, dto, TimeSpan.FromMinutes(5));** - cохраняем данные в кэш.

