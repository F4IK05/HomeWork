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

    public async Task<List<Song>> GetAllAsync()
    {
        return await _context.Songs
            .AsNoTracking()
            .Include(s => s.Artist)
            .Include(s => s.Album)
            .ToListAsync();
    }

    public async Task<Song?> GetByIdAsync(Guid id)
    {
        return await _context.Songs
            .Include(s => s.Artist)
            .Include(s => s.Album)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task AddAsync(Song song)
    {
        await _context.Songs.AddAsync(song);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Song song)
    {
        _context.Songs.Update(song);
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