using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Milk.API.DTOs.Request.Cart;
using Milk.API.DTOs.Response.Cart;
using Milk.API.Services.Interfaces.Auth;
using Milk.API.Services.Interfaces.Cart;
using Milk.Data.Contexts;
using Milk.Data.Models;

namespace Milk.API.Services.Classes.Cart;

public class CartService : ICartService
{
    private readonly MilkDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public CartService(ICurrentUserService currentUserService, MilkDbContext context)
    {
        _currentUserService = currentUserService;
        _context = context;
    }

    public async Task<CartResponseDto> GetMyCartAsync(ClaimsPrincipal user)
    {
        var cart = await GetOrCreateCartAsync(user);
        return await MapAsync(cart.Id);

    }

    public async Task<CartResponseDto> AddToCartAsync(ClaimsPrincipal user, AddToCartRequestDto request)
    {
        if (request.Quantity <= 0) request.Quantity = 1;
        
        var cart = await GetOrCreateCartAsync(user);
        
        var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == request.ProductId && p.IsActive);
        if (product == null) throw new Exception("Product not found");;
        
        var existing = await _context.CartItems.FirstOrDefaultAsync(ci => ci.CartId == cart.Id && ci.ProductId == product.Id);
        
        if (existing != null)
        {
            existing.Quantity += request.Quantity;
        }
        else
        {
            _context.CartItems.Add(new CartItem
            {
                CartId = cart.Id,
                ProductId = product.Id,
                Quantity = request.Quantity,
                UnitPrice = product.Price,
                CreatedAt = DateTime.UtcNow
            });
        }
        
        cart.UpdatedAt = DateTime.UtcNow;
        
        await _context.SaveChangesAsync();
        return await MapAsync(cart.Id);
    }

    public async Task<CartResponseDto> UpdateQtyAsync(ClaimsPrincipal user, string cartItemId, int quantity)
    {
        var cart = await GetOrCreateCartAsync(user);
        
        var item = await _context.CartItems.FirstOrDefaultAsync(ci => ci.Id == cartItemId && ci.CartId == cart.Id);
        if (item == null) throw new Exception("Item not found");

        if (quantity <= 0)
        {
            _context.CartItems.Remove(item);
        }
        else
        {
            item.Quantity = quantity;
        }
        
        cart.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        
        return await MapAsync(cart.Id);
    }

    public async Task<CartResponseDto> RemoveItemAsync(ClaimsPrincipal user, string cartItemId)
    {
        var cart = await GetOrCreateCartAsync(user);
        
        var item = await _context.CartItems.FirstOrDefaultAsync(ci => ci.Id == cartItemId && ci.CartId == cart.Id);
        if (item == null) throw new Exception("Item not found");
        
        _context.CartItems.Remove(item);
        cart.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        
        return await MapAsync(cart.Id);
    }

    public async Task<CartResponseDto> ClearMyCartAsync(ClaimsPrincipal user)
    {
        var cart = await GetOrCreateCartAsync(user);
        
        var items = await _context.CartItems.Where(ci => ci.CartId == cart.Id).ToListAsync();
        _context.CartItems.RemoveRange(items);
        
        cart.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        
        return await MapAsync(cart.Id);
    }
    
    private async Task<Data.Models.Cart> GetOrCreateCartAsync(ClaimsPrincipal userPrincipal)
    {
        var userId = _currentUserService.GetUserId(userPrincipal);
        if (string.IsNullOrWhiteSpace(userId))
            throw new Exception("Unauthorized");

        var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
        if (cart != null) return cart;

        cart = new Data.Models.Cart
        {
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Carts.Add(cart);
        await _context.SaveChangesAsync();
        return cart;
    }

    private async Task<CartResponseDto> MapAsync(string cartId)
    {
        var items = await _context.CartItems
            .AsNoTracking()
            .Include(x => x.Product)
            .Where(x => x.CartId == cartId)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new CartItemResponseDto
            {
                Id = x.Id,
                ProductId = x.ProductId,
                Title = x.Product.Title,
                Volume = x.Product.Volume,
                ImageUrl = x.Product.ImageUrl,
                UnitPrice = x.UnitPrice,
                Quantity = x.Quantity
            })
            .ToListAsync();

        return new CartResponseDto
        {
            CartId = cartId,
            Items = items
        };
    }
}