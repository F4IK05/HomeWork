using Milk.API.DTOs.Response.Common;
using Milk.API.DTOs.Response.Products;

namespace Milk.API.Services.Interfaces.Products;

public interface IProductService
{
    Task<PagedResponseDto<ProductResponseDto>> GetAllAsync(int page, int pageSize, string? search, string? categorySlug);
    // Task<List<ProductResponseDto>> GetPopularAsync(int take);
    Task<ProductResponseDto?> GetByIdAsync(string id);
    Task<List<ProductResponseDto>> GetByCategorySlugAsync(string slug);
}