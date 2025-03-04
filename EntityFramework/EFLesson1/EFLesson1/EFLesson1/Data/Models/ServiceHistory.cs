using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFLesson1.Data.Models;

public class ServiceHistory
{
    [Key]
    public int Id { get; set; }
    
    [ForeignKey("Car")]
    public int CarId { get; set; }
    public Car Car { get; set; }
    
    public DateTime ServiceDate { get; set; } = DateTime.Now;

    public decimal ServicePrice { get; set; }
}