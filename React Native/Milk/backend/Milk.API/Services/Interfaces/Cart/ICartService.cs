using System.Security.Claims;
using Milk.API.DTOs.Request.Cart;
using Milk.API.DTOs.Response.Cart;

namespace Milk.API.Services.Interfaces.Cart;

public interface ICartService
{
    Task<CartResponseDto> GetMyCartAsync(ClaimsPrincipal user);
    Task<CartResponseDto> AddToCartAsync (ClaimsPrincipal user, AddToCartRequestDto request);
    Task<CartResponseDto> UpdateQtyAsync (ClaimsPrincipal user, string cartItemId, int quantity);
    Task<CartResponseDto> RemoveItemAsync (ClaimsPrincipal user, string cartItemId);
    Task<CartResponseDto> ClearMyCartAsync (ClaimsPrincipal user);
}