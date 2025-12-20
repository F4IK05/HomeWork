using domain_1.Models;

namespace domain_1.Repositories;

public interface IItemRepository
{
    Task<Item?> GetItemByIdAsync(string id);
    Task<Item> CreateItemAsync(ItemCreate item);
}