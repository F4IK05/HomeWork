using System.ComponentModel.DataAnnotations;

namespace EFLesson1.Data.Models;

public class Customer
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; }

    [Required]
    [MaxLength(50)]
    public string LastName { get; set; }

    [Required]
    public string PhoneNumber { get; set; }
    
    // Один клиент может купить несколько автомобилей (one-to-many).
    public ICollection<Sale> Sales { get; set; }
}