namespace Milk.API.DTOs.Response.Products;

public class ProductResponseDto
{
    public string Id { get; set; } = string.Empty;
    
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    
    public decimal Price { get; set; }
    public string Volume { get; set; } = string.Empty;
    
    public string ImageUrl { get; set; } = string.Empty;
    
    public string CategoryId { get; set; } = string.Empty;
    public string CategoryName { get; set; } = string.Empty;
    public string CategorySlug { get; set; } = string.Empty;
}