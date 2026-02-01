using Microsoft.EntityFrameworkCore;
using Milk.API.DTOs.Response.Common;
using Milk.API.DTOs.Response.Products;
using Milk.API.Services.Interfaces.Products;
using Milk.Data.Contexts;

namespace Milk.API.Services.Classes.Products;

public class ProductService : IProductService
{
    public MilkDbContext _context;

    public ProductService(MilkDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResponseDto<ProductResponseDto>> GetAllAsync(int page, int pageSize, string? search, string? categorySlug)
    {
        page = page <= 0 ? 1 : page;
        pageSize = pageSize <= 0 ? 10 : pageSize;
        if (pageSize > 50) pageSize = 50;
        
        var query = _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.IsActive);

        if (!string.IsNullOrWhiteSpace(categorySlug))
        {
            var slug = categorySlug.Trim().ToLower();
            query = query.Where(p => p.Category.Slug == slug);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(p =>
                p.Title.ToLower().Contains(s) ||
                p.Description.ToLower().Contains(s));
        }
        
        var total = await query.CountAsync();
        
        var items = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new ProductResponseDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Price = p.Price,
                Volume = p.Volume,
                ImageUrl = p.ImageUrl,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                CategorySlug = p.Category.Slug,
            })
            .ToListAsync();

        return new PagedResponseDto<ProductResponseDto>
        {
            Page = page,
            PageSize = pageSize,
            Total = total,
            Items = items,
        };
    }

    public async Task<ProductResponseDto?> GetByIdAsync(string id)
    {
        if (string.IsNullOrWhiteSpace(id)) return null;

        return await _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.IsActive && p.Id == id)
            .Select(p => new ProductResponseDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Price = p.Price,
                Volume = p.Volume,
                ImageUrl = p.ImageUrl,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                CategorySlug = p.Category.Slug,
            })
            .FirstOrDefaultAsync();
    }

    public async Task<List<ProductResponseDto>> GetByCategorySlugAsync(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug)) return new List<ProductResponseDto>();
        
        var s = slug.Trim().ToLower();
        
        return await _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .Where(p => p.IsActive && p.Category.Slug == s)
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new ProductResponseDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Price = p.Price,
                Volume = p.Volume,
                ImageUrl = p.ImageUrl,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                CategorySlug = p.Category.Slug,
            })
            .ToListAsync();
    }
}