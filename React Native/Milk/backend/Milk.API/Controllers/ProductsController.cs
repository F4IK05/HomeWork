using Microsoft.AspNetCore.Mvc;
using Milk.API.DTOs.Response.Common;
using Milk.API.DTOs.Response.Products;
using Milk.API.Services.Interfaces.Products;

namespace Milk.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet("get-all")]
    public async Task<ActionResult<PagedResponseDto<ProductResponseDto>>> GetAll(
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null, 
        [FromQuery] string? categorySlug = null)
    {
        var res = await _productService.GetAllAsync(page, pageSize, search, categorySlug);
        return Ok(res);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductResponseDto>> GetById(string id)
    {
        var result = await _productService.GetByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }
    
    [HttpGet("by-category/{slug}")]
    public async Task<ActionResult<List<ProductResponseDto>>> ByCategory(string slug)
    {
        var result = await _productService.GetByCategorySlugAsync(slug);
        return Ok(result);
    }
}