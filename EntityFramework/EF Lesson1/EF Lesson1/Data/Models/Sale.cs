using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EF_Lesson1.Data.Models;

public class Sale
{
    [Key]
    public int Id { get; set; }
    
    public DateTime SaleDate { get; set; } = DateTime.Now;
    
    [ForeignKey("Customer")]
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    
    [ForeignKey("Car")]
    public int CarId { get; set; }
    public Car Car { get; set; }
    
    [ForeignKey("Employee")]
    public int EmployeeId { get; set; }
    public Employee Employee { get; set; }
}