namespace Milk.API.DTOs.Response.Cart;

public class CartResponseDto
{
    public string CartId { get; set; } = string.Empty;
    public List<CartItemResponseDto> Items { get; set; } = new();
    
    public decimal TotalPrice => Items.Sum(x => x.LineTotal);
}