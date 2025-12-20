using domain_2.Data;
using domain_2.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace domain_2.Endpoints;

public static class OrdersEndpoints
{
    public record CreateOrderDto(int UserId, string ProductName, int Quantity);

    public static void MapOrders(this WebApplication app)
    {
        app.MapPost("/orders", async (CreateOrderDto dto, OrdersDbContext db) =>
        {
            var order = new Order
            {
                UserId = dto.UserId,
                ProductName = dto.ProductName,
                Quantity = dto.Quantity
            };

            db.Orders.Add(order);
            await db.SaveChangesAsync();
            return Results.Ok(order);
        });

        app.MapGet("/orders/{id:int}", async (int id, OrdersDbContext db) =>
        {
            var order = await db.Orders.FirstOrDefaultAsync(o => o.Id == id);
            return order is null ? Results.NotFound() : Results.Ok(order);
        });

        app.MapGet("/orders", async (OrdersDbContext db) =>
        {
            var list = await db.Orders.OrderByDescending(o => o.Id).ToListAsync();
            return Results.Ok(list);
        });
    }
}
