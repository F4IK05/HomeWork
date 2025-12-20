using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db)
    {
        _db = db;
    }

    // GET /api/products
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll()
    {
        var items = await _db.Products
            .AsNoTracking()
            .OrderBy(x => x.Id)
            .ToListAsync();

        return Ok(items);
    }
}
