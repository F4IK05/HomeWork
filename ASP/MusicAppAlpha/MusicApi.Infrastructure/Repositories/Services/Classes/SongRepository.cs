using Microsoft.EntityFrameworkCore;
using MusicApi.Data.Models;
using MusicApi.Infrastructure.Contexts;
using MusicApi.Infrastructure.Repositories.Services.Interfaces;

namespace MusicApi.Infrastructure.Repositories.Services.Classes;

public class SongRepository : ISongRepository
{
    private readonly MusicDbContext _context;

    public SongRepository(MusicDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Song>> GetAllAsync()
    {
        return await _context.Songs.ToListAsync();
    }

    public async Task<Song?> GetByIdAsync(Guid id)
    {
        return await _context.Songs.FindAsync(id);
    }

    public async Task AddAsync(Song song)
    {
        await _context.Songs.AddAsync(song);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var song = await _context.Songs.FindAsync(id);
        if (song != null)
        {
            _context.Songs.Remove(song);
            await _context.SaveChangesAsync();
        }
    }
}