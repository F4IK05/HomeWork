using MusicApi.Data.Models;

namespace MusicApi.Infrastructure.Repositories.Services.Interfaces;

public interface ISongRepository
{
    Task<IEnumerable<Song>> GetAllAsync();
    Task<Song?> GetByIdAsync(Guid id);
    Task AddAsync(Song song);
    Task DeleteAsync(Guid id);
}