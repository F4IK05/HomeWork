using System.ComponentModel.DataAnnotations;

namespace EF_Lesson1.Data.Models;

public class Car
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string Brand { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string Model { get; set; }
    
    public DateTime ProductionYear { get; set; } = DateTime.Now;
    public decimal Price { get; set; }
}