using Microsoft.EntityFrameworkCore;
using MusicApi.Data.Models;
using MusicApi.Infrastructure.Contexts;
using MusicApi.Infrastructure.Repositories.Services.Interfaces;

namespace MusicApi.Infrastructure.Repositories.Services.Classes;

public class AlbumRepository : IAlbumRepository
{
    private readonly MusicDbContext _context;

    public AlbumRepository(MusicDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<Album>> GetAllAsync()
    {
        return await _context.Albums
            .Include(a => a.Artist)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Album?> GetByIdAsync(Guid id)
    {
        return await _context.Albums
            .Include(a => a.Artist)
            .Include(a => a.Songs)
            .ThenInclude(s => s.Artist)
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task AddAsync(Album album)
    {
        _context.Albums.Add(album);
        await _context.SaveChangesAsync();
    }
}