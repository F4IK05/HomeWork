USE TEST

-- Customers

-- 1. Вставить данные о новом клиенте в таблицу `Customers`.

INSERT INTO Customers (FirstName, LastName, Email)
VALUES ('John', 'Doe', 'johndoe99@gmail.com');

-- 2. Обновить email клиента с `CustomerID = 1`.

UPDATE Customers
SET Email = 'doejohn99@gmail.com'
WHERE CustomerID = 1;

-- 3. Удалить клиента с `CustomerID = 5` из таблицы `Customers`.

-- Сначала добавлю:

INSERT INTO Customers(FirstName, LastName, Email)
VALUES ('Robert', 'Brown', 'robert.brown@example.com'),
       ('Emily', 'Davis', 'emily.davis@example.com'),
       ('Michael', 'Miller', 'michael.miller@example.com'),
       ('Sarah', 'Wilson', 'sarah.wilson@example.com'),
       ('David', 'Moore', 'david.moore@example.com');

-- Теперь удаляю:

DELETE Customers WHERE CustomerID = 5

-- 4. Выбрать все записи из таблицы `Customers`, отсортированные по фамилии (`LastName`).

SELECT * FROM Customers
ORDER BY LastName

-- 5. Вставить несколько новых клиентов в таблицу `Customers`.

INSERT INTO Customers (FirstName, LastName, Email)
VALUES
('James', 'Taylor', 'james.taylor@example.com'),
('Linda', 'Anderson', 'linda.anderson@example.com'),
('William', 'Thomas', 'william.thomas@example.com'),
('Jessica', 'Jackson', 'jessica.jackson@example.com'),
('Daniel', 'White', 'daniel.white@example.com');

---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------

-- Orders

-- 6. Вставить новый заказ в таблицу `Orders` для клиента с `CustomerID = 1`.

INSERT INTO Orders (CustomerID, OrderDate, TotalAmount)
VALUES (1, '2025-01-10', 150.75);

-- 7. Обновить `TotalAmount` заказа с `OrderID = 2`.

-- Сначала добавлю:

INSERT INTO Orders (CustomerID, OrderDate, TotalAmount)
VALUES (2, '2025-01-11', 200.50);

-- Далее обновлю:

UPDATE Orders
SET TotalAmount = 222.22
WHERE OrderID = 2;

-- 8. Удалить заказ с `OrderID = 3` из таблицы `Orders`.

-- Сначала добавлю:

INSERT INTO Orders (CustomerID, OrderDate, TotalAmount)
VALUES (3, '2025-01-12', 300.00);

-- Затем удалю:

DELETE Orders WHERE OrderID = 3;

-- 9. Выбрать все заказы клиента с `CustomerID = 1`.

-- Добавлю еще один заказ к `CustomerID = 1`.

INSERT INTO Orders (CustomerID, OrderDate, TotalAmount)
VALUES (1, '2023-12-01', 180.00);

-- Затем выберу:

SELECT * FROM Orders
WHERE CustomerID = 1;

-- 10. Выбрать все заказы, сделанные в 2023 году.

-- Для этого добавлю еще:

INSERT INTO Orders (CustomerID, OrderDate, TotalAmount)
VALUES (3, '2025-01-12', 300.00),
       (4, '2025-01-13', 175.25),
       (6, '2023-12-01', 190.00),
       (6, '2025-01-15', 180.40),
       (7, '2025-01-16', 250.60),
       (8, '2025-01-17', 320.30),
       (9, '2025-01-18', 210.00),
       (10, '2025-01-19', 145.75),
       (11, '2025-01-14', 120.90);

-- Все заказы в 23 году

SELECT * FROM Orders
WHERE YEAR(OrderDate) = 2023;

---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------

-- Products

-- 11. Вставить новый продукт в таблицу `Products`.

INSERT INTO Products (ProductName, Price)
VALUES ('Laptop', 1200.50);

-- 12. Обновить цену продукта с `ProductID = 2`.

-- Сначала добавлю:

INSERT INTO Products (ProductName, Price)
VALUES ('Smartphone', 750.00);

-- Далее обновлю:

UPDATE Products
SET Price = 650
WHERE ProductID = 2;

-- 13. Удалить продукт с `ProductID = 4` из таблицы `Products`.

-- Сначала добавлю:

INSERT INTO Products (ProductName, Price)
VALUES ('Tablet', 500.75),
       ('Headphones', 150.25);

-- Затем удалю:

DELETE Products WHERE ProductID = 4

-- 14. Выбрать все продукты, цена которых больше 100.

-- Добавлю еще:

INSERT INTO Products (ProductName, Price)
VALUES ('Smartwatch', 299.99),
       ('Keyboard', 89.50),
       ('Mouse', 45.00),
       ('Monitor', 320.40),
       ('Printer', 199.99),
       ('External Hard Drive', 90.75);

-- Все продукты, цена которых больше 100:

SELECT * FROM Products
WHERE Price > 100;

-- 15. Выбрать все продукты, цена которых меньше или равна 50.

SELECT * FROM Products
WHERE Price <= 50;

---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------

-- OrderDetails

-- 16. Вставить данные о товаре в заказ в таблицу `OrderDetails`.

INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Price)
VALUES
(1, 1, 1, 1200.50),
(1, 3, 2, 500.75),
(2, 2, 1, 650.00),
(4, 5, 1, 299.99),
(11, 6, 2, 89.50),
(12, 7, 1, 45.00),
(13, 8, 1, 320.40),
(14, 9, 2, 199.99),
(15, 10, 1, 90.75);

-- 17. Обновить количество товара в заказе с `OrderDetailID = 11`.

UPDATE OrderDetails
SET Quantity = 5
WHERE OrderDetailID = 11;

-- 18. Удалить товар из заказа с `OrderDetailID = 12`.

DELETE OrderDetails WHERE OrderDetailID = 12;

-- 19. Выбрать все товары из заказа с `OrderID = 1`.

SELECT * FROM OrderDetails
WHERE OrderID = 1

-- 20. Выбрать все заказы, в которых есть продукт с `ProductID = 2`.

SELECT * FROM OrderDetails
WHERE ProductID = 2;

---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------

-- ### Простые JOIN

-- 21. Выбрать все заказы с полным именем клиента (использовать INNER JOIN между таблицами `Orders` и `Customers`).

SELECT Orders.OrderID, Customers.FirstName + ' ' + Customers.LastName AS 'FullName', Orders.OrderDate, Orders.TotalAmount FROM Orders
INNER JOIN Customers on Customers.CustomerID = Orders.CustomerID

-- 22. Выбрать все продукты с именем клиента и количеством товаров, используя INNER JOIN между `OrderDetails`, `Orders` и `Customers`.

SELECT Products.ProductName ,Customers.FirstName + ' ' + Customers.LastName AS 'FullName', OrderDetails.Quantity FROM OrderDetails
INNER JOIN Orders on Orders.OrderID = OrderDetails.OrderID
INNER JOIN Customers on Customers.CustomerID = Orders.CustomerID
INNER JOIN Products on OrderDetails.ProductID = Products.ProductID

-- 23. Используя LEFT JOIN, выбрать все заказы и соответствующие данные о клиентах, включая заказы без клиентов.

SELECT * FROM Orders
LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID -- у меня таковых нету

-- Комбинированные JOIN

-- 24. Используя INNER JOIN, вывести все заказы с названиями продуктов.

SELECT Orders.OrderID, Orders.CustomerID, Orders.OrderDate, Orders.TotalAmount, Products.ProductName FROM Orders
INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
INNER JOIN Products ON Products.ProductID = OrderDetails.ProductID

-- 25. Используя LEFT JOIN, вывести всех клиентов и их заказы, включая тех, у кого нет заказов.

-- У меня нету клиентов без заказов, поэтому добавлю его
INSERT INTO Customers (FirstName, LastName, Email)
VALUES ('John', 'Wick', 'john.wick@example.com');

SELECT Customers.CustomerID, Customers.FirstName + ' ' + Customers.LastName AS 'FullName', Customers.Email, Orders.OrderId FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID

-- 26. Используя RIGHT JOIN, вывести все продукты и информацию о заказах, в которых они присутствуют.

SELECT Products.ProductID, Products.ProductName, Orders.OrderID, Orders.OrderDate, Orders.TotalAmount FROM Products
RIGHT JOIN OrderDetails ON Products.ProductID = OrderDetails.ProductID
RIGHT JOIN Orders ON Orders.OrderID = OrderDetails.OrderID
WHERE Products.ProductID IS NOT NULL -- я мог неправильно понять условие

-- 27. Используя INNER JOIN между таблицами `Products`, `OrderDetails` и `Orders`, вывести все заказы с названиями продуктов.

SELECT Orders.OrderID, Orders.OrderDate, Orders.TotalAmount, ProductName FROM Orders
INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
INNER JOIN Products ON Products.ProductID = OrderDetails.ProductID

-- 28. Используя INNER JOIN между таблицами `Customers`, `Orders` и `OrderDetails`, вывести имена клиентов и их заказы с указанием стоимости каждого товара.

SELECT Customers.CustomerID, Customers.FirstName + ' ' +Customers.LastName AS 'FullName', Orders.OrderID, Orders.TotalAmount  FROM Customers
INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID
INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID

---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------

-- ### Подзапросы и JOIN
-- 29. Используя подзапрос в SELECT, вывести имена клиентов, которые сделали заказ на сумму больше 200(тут стояло 500).

-- я изменил условие, чтобы данные таблицы могли быть использованы

SELECT FirstName + ' ' + LastName AS 'More200',
       (SELECT SUM(TotalAmount) FROM Orders WHERE Customers.CustomerID = Orders.CustomerID) AS Total
FROM Customers
WHERE (SELECT SUM(TotalAmount) FROM Orders WHERE Customers.CustomerID = Orders.CustomerID) > 200

-- 30. Используя подзапрос в WHERE, вывести все продукты, которые были заказаны более 1 раза.(тут стояло 10 раз)

SELECT Products.ProductID, Products.ProductName, Products.Price, OrderDetails.Quantity FROM Products
INNER JOIN OrderDetails on Products.ProductID = OrderDetails.ProductID
WHERE Products.ProductID IN (SELECT ProductID FROM OrderDetails GROUP BY ProductID HAVING SUM(Quantity) > 1)

-- 31. Используя подзапрос в SELECT, вывести общую сумму всех заказов для каждого клиента.

SELECT FirstName + ' ' + LastName AS 'FullName',
       (SELECT SUM(TotalAmount) FROM Orders WHERE Customers.CustomerID = Orders.CustomerID) AS TotalSpent
FROM Customers
WHERE (SELECT SUM(TotalAmount) FROM Orders WHERE Customers.CustomerID = Orders.CustomerID) IS NOT NULL

-- этот WHERE я написал потому что в таблице есть 'John Wick' который не имеет заказов вообще

-- 32. Используя подзапрос в SELECT, вывести все продукты, стоимость которых больше средней стоимости всех продуктов.

SELECT ProductID, ProductName, Price, (SELECT AVG(Price) FROM Products) AS AvgPrice FROM Products
WHERE Price > (SELECT AVG(Price) FROM Products)

---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------

-- ### Многоступенчатые JOIN
-- 33. Используя несколько JOIN, вывести все заказы с подробной информацией о клиентах и продуктах.

SELECT
    Orders.OrderID,
    Orders.CustomerID,
    Orders.OrderDate,
    Orders.TotalAmount,
    Customers.FirstName + ' ' +Customers.LastName AS 'FullName',
    Customers.Email,
    Products.ProductName
FROM Orders
INNER JOIN Customers ON Customers.CustomerID = Orders.CustomerID
INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
INNER JOIN Products ON Products.ProductID = OrderDetails.ProductID

-- 34. Написать запрос с использованием нескольких JOIN, чтобы вывести список клиентов, их заказов и продуктов, которые они заказали,
-- с количеством и ценой.

SELECT
    Customers.CustomerID,
    Customers.FirstName + ' ' +Customers.LastName AS 'FullName',
    Customers.Email,
    Orders.OrderID,
    Orders.OrderDate,
    Orders.TotalAmount,
    OrderDetails.Quantity,
    Products.ProductName,
    Products.Price
FROM Customers
INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID
INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
INNER JOIN Products ON Products.ProductID = OrderDetails.ProductID

-- 35. Используя несколько JOIN, вывести список всех клиентов и продуктов, которые они купили, а также суммарную стоимость товаров в каждом заказе.

SELECT
    Customers.CustomerID,
    Customers.FirstName + ' ' +Customers.LastName AS 'FullName',
    Products.ProductName,
    OrderDetails.Quantity,
    OrderDetails.Quantity * Products.Price AS TotalCost
FROM Customers
INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID
INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
INNER JOIN Products ON Products.ProductID = OrderDetails.ProductID

-- ## 6. Дополнительные задания:
-- 36. Выбрать все заказы с количеством товаров, общая стоимость которых превышает 1000.

SELECT
    Orders.OrderID,
    Orders.CustomerID,
    OrderDetails.Quantity,
    OrderDetails.Price,
    Products.ProductName,
    SUM(OrderDetails.Quantity * Products.Price) AS TotalCost
FROM Orders
INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
INNER JOIN Products ON OrderDetails.ProductID = Products.ProductID
GROUP BY Orders.OrderID, Orders.CustomerID, OrderDetails.Quantity, OrderDetails.Price, ProductName
HAVING SUM(OrderDetails.Quantity * Products.Price) > 1000

-- 37. Выбрать клиентов, у которых заказы превышают среднюю сумму всех заказов.

SELECT
    Customers.CustomerID,
    Customers.FirstName + ' ' +Customers.LastName AS 'FullName',
    Orders.OrderId,
    Orders.TotalAmount
FROM Customers
INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID
WHERE Orders.TotalAmount > (SELECT AVG(TotalAmount) FROM Orders)

-- 38. Написать запрос с использованием GROUP BY для подсчета количества заказов каждого клиента.

SELECT
    Customers.CustomerID,
    Customers.FirstName + ' ' +Customers.LastName AS 'FullName',
    COUNT(Orders.OrderID) AS CountOfOrders
FROM Customers
INNER JOIN Orders on Customers.CustomerID = Orders.CustomerID
GROUP BY Customers.CustomerID, Customers.FirstName, Customers.LastName

-- 39. Написать запрос с использованием HAVING для подсчета общего числа товаров, заказанных более чем 3 раза.

SELECT
    Orders.OrderID,
    OrderDetails.ProductID,
    OrderDetails.Quantity,
    SUM(OrderDetails.Quantity) AS TotalQuantity
FROM Orders
INNER JOIN OrderDetails on Orders.OrderID = OrderDetails.OrderID
GROUP BY Orders.OrderID, OrderDetails.ProductID, OrderDetails.Quantity
HAVING SUM(OrderDetails.Quantity)  > 3

-- 40. Выбрать клиентов и количество заказанных товаров для каждого заказа с использованием GROUP BY и JOIN.

SELECT
    Customers.CustomerID,
    Customers.FirstName + ' ' + Customers.LastName AS 'FullName',
    Products.ProductName,
    OrderDetails.Quantity
FROM Customers
INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID
INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
INNER JOIN Products ON Products.ProductID = OrderDetails.ProductID
GROUP BY Customers.CustomerID, Customers.FirstName + ' ' + Customers.LastName, OrderDetails.ProductID, OrderDetails.Quantity, Products.ProductName


-- P.S: я сильно запутался в запросах пока их писал, надеюсь я сделал то что просили