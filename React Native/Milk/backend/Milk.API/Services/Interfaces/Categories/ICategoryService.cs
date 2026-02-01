using Milk.API.DTOs.Response.Categories;

namespace Milk.API.Services.Interfaces.Categories;

public interface ICategoryService
{
    Task<List<CategoryResponseDto>> GetAllAsync();
}