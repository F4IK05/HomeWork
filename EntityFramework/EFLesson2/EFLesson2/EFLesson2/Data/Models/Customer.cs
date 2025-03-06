using System.ComponentModel.DataAnnotations;

namespace EFLesson2.Data.Models;

public class Customer
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string Name { get; set; }
    
    [Required]
    public string Phone { get; set; }
    
    // Lazy Loading
    public virtual ICollection<CarOrder> CarOrders { get; set; }
}