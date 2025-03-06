using System.ComponentModel.DataAnnotations;

namespace EFLesson2.Data.Models;

public class Dealer
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string Name { get; set; }
    
    [Required]
    [MaxLength(50)]
    public string Location { get; set; }
    
    // virtual для Lazy Loading
    public virtual ICollection<Car> Cars { get; set; }
}