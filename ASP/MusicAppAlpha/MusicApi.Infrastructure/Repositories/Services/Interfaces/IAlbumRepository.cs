using MusicApi.Data.Models;

namespace MusicApi.Infrastructure.Repositories.Services.Interfaces;

public interface IAlbumRepository
{
    Task<List<Album>> GetAllAsync();
    Task<Album?> GetByIdAsync(Guid id);
    Task AddAsync(Album album);
    
}