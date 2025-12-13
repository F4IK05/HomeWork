using MusicApi.Data.Models;

namespace MusicApi.Infrastructure.Repositories.Services.Interfaces;

public interface ISongRepository
{
    Task<List<Song>> GetAllAsync();
    Task<Song?> GetByIdAsync(Guid id);
    Task AddAsync(Song song);
    Task UpdateAsync(Song song);
    Task DeleteAsync(Guid id);
}