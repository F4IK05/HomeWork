using Microsoft.EntityFrameworkCore;
using Milk.API.DTOs.Response.Categories;
using Milk.API.Services.Interfaces.Categories;
using Milk.Data.Contexts;

namespace Milk.API.Services.Classes.Categories;

public class CategoryService : ICategoryService
{
    private readonly MilkDbContext _context;

    public CategoryService(MilkDbContext context)
    {
        _context = context;
    }

    public async Task<List<CategoryResponseDto>> GetAllAsync()
    {
        return await _context.Categories
            .AsNoTracking()
            .OrderBy(c => c.Name)
            .Select(c => new CategoryResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                Slug = c.Slug
            })
            .ToListAsync();
    }
}