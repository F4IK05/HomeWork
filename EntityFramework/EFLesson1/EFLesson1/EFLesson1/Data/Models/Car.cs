using System.ComponentModel.DataAnnotations;

namespace EFLesson1.Data.Models;

public class Car
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Make { get; set; }

    [Required]
    [MaxLength(50)]
    public string Model { get; set; }
    
    public int Year { get; set; } = DateTime.Now.Year;

    [Required]
    public decimal Price { get; set; }
    
    // Один автомобиль может иметь несколько записей об обслуживании (one-to-many).
    public ICollection<ServiceHistory> ServiceHistories { get; set; }
}