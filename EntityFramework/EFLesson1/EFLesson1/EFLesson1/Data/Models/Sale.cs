using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFLesson1.Data.Models;

public class Sale
{
    [Key]
    public int Id { get; set; }
    
    [ForeignKey("Car")]
    public int CarId { get; set; }
    public Car Car { get; set; }
    
    [ForeignKey("Customer")]
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    
    [ForeignKey("Employee")]
    public int EmployeeId { get; set; }
    public Employee Employee { get; set; }
    
    public DateTime Date { get; set; } = DateTime.Now;
    
}