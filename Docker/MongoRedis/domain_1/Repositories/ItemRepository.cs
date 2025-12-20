using domain_1.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace domain_1.Repositories;

public class ItemRepository : IItemRepository
{
    private readonly IMongoCollection<Item> _collection;

    public ItemRepository(IMongoClient client)
    {
        var db = client.GetDatabase("domain1_db");
        _collection = db.GetCollection<Item>("items");
    }

    public async Task<Item> CreateItemAsync(ItemCreate itemCreate)
    {
        var item = new Item
        {
            Name = itemCreate.Name,
            Price = itemCreate.Price
        };
        
        await _collection.InsertOneAsync(item);
        return item;
    }

    public async Task<Item?> GetItemByIdAsync(string id)
    {
        if (!ObjectId.TryParse(id, out var objId))
            return null;

        return await _collection.Find(x => x.Id == objId).FirstOrDefaultAsync();
    }
}