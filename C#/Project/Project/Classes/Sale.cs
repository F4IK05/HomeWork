using Project.Interfaces;

namespace Project.Classes;

public class Sale : ISale
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ShowroomId { get; set; } // идентификатор салона в котором произошла продажа
    public Guid CarId { get; set; } // идентификатор машины которая была продана
    public Guid UserId { get; set; } // идентификатор пользователя который продал машину
    public DateTime SaleDate { get; set; } // дата продажи
}