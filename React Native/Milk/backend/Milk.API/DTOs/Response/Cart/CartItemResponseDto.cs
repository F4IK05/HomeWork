namespace Milk.API.DTOs.Response.Cart;

public class CartItemResponseDto
{
    public string Id { get; set; } = string.Empty;
    public string ProductId { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;
    public string Volume { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;

    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }

    public decimal LineTotal => UnitPrice * Quantity;
}