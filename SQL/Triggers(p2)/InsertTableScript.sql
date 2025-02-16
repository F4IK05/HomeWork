INSERT INTO Customers (Name, Email, Phone) VALUES
(N'Иван Петров', 'ivan.petrov@email.com', '123-456-789'),
(N'Мария Сидорова', 'maria.sidorova@email.com', '987-654-321'),
(N'Алексей Смирнов', 'alex.smirnov@email.com', '555-666-777');

INSERT INTO Cars (Brand, Model, Year, Price) VALUES
('Toyota', 'Camry', 2022, 30000),
('BMW', 'X5', 2023, 60000),
('Mercedes', 'C-Class', 2021, 50000);

INSERT INTO Orders (CustomerId, CarId) VALUES
(1, 1),
(2, 2),
(3, 3);