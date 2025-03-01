using System.ComponentModel.DataAnnotations;

namespace EF_Lesson1.Data.Models;

public class Employee
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
    public decimal Salary { get; set; }
}