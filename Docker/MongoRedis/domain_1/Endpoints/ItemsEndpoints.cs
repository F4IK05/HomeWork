using domain_1.Models;
using domain_1.Repositories;
using domain_1.Services;

namespace domain_1.Endpoints;

public static class ItemsEndpoints
{
    public static void MapItemsEndpoints(this WebApplication app)
    {
        app.MapGet("/items/{id}", async (string id, IItemRepository repository, ICacheService cache) =>
        {
            var cacheKey = $"item:{id}";
            
            var cachedItem = await cache.GetAsync<Item>(cacheKey);

            if (cachedItem != null)
            {
                return Results.Ok(cachedItem);
            }

            var item = await repository.GetItemByIdAsync(id);

            if (item == null)
            {
                return Results.NotFound();
            }

            // сохранениник в кэш
            await cache.SetAsync(cacheKey, item, TimeSpan.FromMinutes(5));
            return Results.Ok(item);
        });

        app.MapPost("/items", async (ItemCreate itemCreate, IItemRepository repository) =>
        {
            var newItem = await repository.CreateItemAsync(itemCreate);
            return Results.Created($"/items/{newItem.Id}", newItem);
        });
    }
}