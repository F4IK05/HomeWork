using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFLesson2.Data.Models;

public class CarOrder
{
    [Key]
    public int Id { get; set; }
 
    [ForeignKey("Car")]
    public int CarId { get; set; }
    // Lazy Loading
    public virtual Car Car { get; set; }

    [ForeignKey("Customer")]
    public int CustomerId { get; set; }
    // Lazy Loading
    public virtual Customer Customer { get; set; }
}