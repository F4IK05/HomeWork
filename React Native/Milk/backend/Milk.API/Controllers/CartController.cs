using Microsoft.AspNetCore.Mvc;
using Milk.API.DTOs.Request.Cart;
using Milk.API.DTOs.Response.Cart;
using Milk.API.DTOs.Response.Categories;
using Milk.API.Services.Interfaces.Cart;

namespace Milk.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    public async Task<ActionResult<CategoryResponseDto>> GetMyCart()
    {
        var res = await _cartService.GetMyCartAsync(User);
        
        return Ok(res);
    }

    [HttpPost("items/add-to-cart")]
    public async Task<ActionResult<CartResponseDto>> AddToCartAsync(AddToCartRequestDto request)
    {
        var res = await _cartService.AddToCartAsync(User, request);
        
        return Ok(res);
    }

    [HttpPut("items/update-qty/{cartItemId}")]
    public async Task<ActionResult<CartResponseDto>> UpdateQty(string cartItemId, UpdateCartItemQtyRequestDto request)
    {
        var res = await _cartService.UpdateQtyAsync(User, cartItemId, request.Quantity);
        
        return Ok(res);
    }

    [HttpDelete("items/remove-from-cart/{cartItemId}")]
    public async Task<ActionResult<CartResponseDto>> RemoveFromCart(string cartItemId)
    {
        var res = await _cartService.RemoveItemAsync(User, cartItemId);
        
        return Ok(res);
    }

    [HttpDelete("clear-cart")]
    public async Task<ActionResult<CartResponseDto>> ClearCart()
    {
        var res = await _cartService.ClearMyCartAsync(User);
        
        return Ok(res);
    }
}