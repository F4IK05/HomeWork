using MusicApi.Data.Models;

namespace MusicApi.Infrastructure.Repositories.Services.Interfaces;

public interface IArtistRepository
{
    Task<List<Artist>> GetAllAsync();
    Task<Artist?> GetByIdAsync(Guid id);
    Task<Artist?> GetByNameAsync(string name);
    Task AddAsync(Artist artist);
}