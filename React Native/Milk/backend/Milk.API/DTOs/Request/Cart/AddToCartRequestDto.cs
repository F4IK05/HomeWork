using Milk.Data.Models;

namespace Milk.API.DTOs.Request.Cart;

public class AddToCartRequestDto
{
    public string ProductId { get; set; } = string.Empty;
    public int Quantity { get; set; } = 1;
}