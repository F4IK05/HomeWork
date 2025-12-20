using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Mvc.Controllers;

public class ProductsController : Controller
{
    private readonly IHttpClientFactory _httpClientFactory;

    public ProductsController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<IActionResult> Index()
    {
        var client = _httpClientFactory.CreateClient("Api");

        var json = await client.GetStringAsync("api/products");

        var products = JsonSerializer.Deserialize<List<ProductViewModel>>(json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
            ?? new List<ProductViewModel>();

        return View(products);
    }
}

