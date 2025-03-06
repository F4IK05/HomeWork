using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFLesson2.Data.Models;

public class Car
{
    [Key]
    public int Id { get; set; }
    
    [ForeignKey("Dealer")]
    public int DealerId { get; set; }
    // Lazy Loading
    public virtual Dealer Dealer { get; set; }

    [Required]
    [StringLength(100)]
    public string Make { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Model { get; set; }
    
    [Range(1900, 2100)]
    public int Year { get; set; } = DateTime.Now.Year;
    
    // Lazy Loading
    public virtual ICollection<CarOrder> CarOrders { get; set; }
}