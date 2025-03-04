using System.ComponentModel.DataAnnotations;

namespace EFLesson1.Data.Models;

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
    
    public decimal Salary { get; set; }
}