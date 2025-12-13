using Microsoft.EntityFrameworkCore;
using MusicApi.Data.Models;
using MusicApi.Infrastructure.Contexts;
using MusicApi.Infrastructure.Repositories.Services.Interfaces;

namespace MusicApi.Infrastructure.Repositories.Services.Classes;

public class ArtistRepository : IArtistRepository
{
    private readonly MusicDbContext _context;

    public ArtistRepository(MusicDbContext context)
    {
        _context = context;
    }

    public async Task<List<Artist>> GetAllAsync()
    {
        return await _context.Artists
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Artist?> GetByIdAsync(Guid id)
    {
        return await _context.Artists
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<Artist?> GetByNameAsync(string name)
    {
        return await _context.Artists
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.ArtistName == name);
    }

    public async Task AddAsync(Artist artist)
    {
        _context.Artists.Add(artist);
        await _context.SaveChangesAsync();
    }
}