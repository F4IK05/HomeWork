namespace Project.Data.Model;

public class User
{
        // автоматически генерируется новый Guid для уникальности
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid ShowroomId { get; set; } // идентификатор салона в котором работает пользователь
        public string Username { get; set; }
        public string Password { get; set; }
}
