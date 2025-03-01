using System.ComponentModel.DataAnnotations;

namespace EF_Lesson1.Data.Models;

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
    
    [MaxLength(100)]
    public string Email { get; set; }
    
    [Required]
    public string PhoneNumber { get; set; }
}