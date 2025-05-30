﻿namespace Project.Data.Models;

public class Order
{
    public int Id { get; set; }
    
    public int UserId { get; set; }
    public User User { get; set; }
    
    public DateTime OrderDate { get; set; }
    
    public decimal TotalAmount { get; set; }
    
    // Один заказ может содержать несколько игр.
    public ICollection<OrderContent> OrderContents { get; set; }
}