-- 1️⃣ Триггер на отслеживание изменения цены автомобиля
-- Создайте триггер, который при изменении цены автомобиля добавляет запись в таблицу CarPriceHistory.

CREATE TRIGGER CarPriceChange ON Cars
FOR UPDATE
AS
BEGIN
    DECLARE @CarId int;
    DECLARE @OldPrice decimal(10,2);
    DECLARE @NewPrice decimal(10,2);

    set @CarId = (SELECT Id FROM inserted)
    set @OldPrice = (SELECT Price FROM deleted WHERE Id = @CarId)
    set @NewPrice = (SELECT Price FROM inserted WHERE Id = @CarId)

    IF UPDATE(Price)
    BEGIN
        INSERT INTO CarPriceHistory (CarId, OldPrice, NewPrice, ChangeDate)
        VALUES (@CarId, @OldPrice, @NewPrice, GETDATE())
    END
END

------------------------------------------------------------------------------------------------------------------------

-- Обновим
UPDATE Cars
SET Price = 25000
WHERE Id = 1

------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------

-- 2️⃣ Триггер на предотвращение удаления клиентов с активными заказами
-- Запретите удаление клиентов, у которых есть активные заказы.

CREATE TRIGGER CustomersDeleteBlock ON Customers
INSTEAD OF DELETE
AS
BEGIN
    DECLARE @CustomerId int;

    set @CustomerId = (SELECT Id FROM deleted)

    IF EXISTS (SELECT 1 FROM Orders WHERE @CustomerId = CustomerId AND CustomerId IS NOT NULL)
    BEGIN
        print ('Customer has active order!');
        ROLLBACK TRANSACTION;
    END
END

------------------------------------------------------------------------------------------------------------------------

-- Удаляем
DELETE FROM Customers
WHERE Id = 2

------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------

-- 3️⃣ Триггер на логирование удаления заказов
-- При удалении заказа сохраните его данные в DeletedOrdersLog.

CREATE TRIGGER SaveToLog ON Orders
FOR DELETE
AS
BEGIN
    DECLARE @CustomerId int;
    DECLARE @CarId int;
    DECLARE @OrderId int;
    DECLARE @OrderDate datetime;
    DECLARE @DeleteAt datetime;

    set @CustomerId = (SELECT CustomerId FROM deleted);
    set @CarId = (SELECT CarId FROM deleted);
    set @OrderId = (SELECT Id FROM deleted);
    set @OrderDate = (SELECT OrderDate FROM deleted);
    set @DeleteAt = GETDATE();

    INSERT INTO DeletedOrdersLog (OrderId, CustomerId, CarId, OrderDate, DeletedAt)
    VALUES (@OrderId, @CustomerId, @CarId, @OrderDate, @DeleteAt)
END

------------------------------------------------------------------------------------------------------------------------

-- Удаляем
DELETE FROM Orders
WHERE Id = 2

------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------

-- 4️⃣ Триггер на автоматическое обновление цены при изменении года выпуска
-- Если изменяется год выпуска автомобиля, автоматически снижайте цену на 5%.

CREATE TRIGGER UpdateInfo ON Cars
FOR UPDATE
AS
BEGIN
    DECLARE @CarId int;

    set @CarId = (SELECT Id FROM inserted);

    IF UPDATE(Year)
    BEGIN
       UPDATE Cars
        SET Price = Price - Price * 0.05
        WHERE Id = @CarId
    END
END

------------------------------------------------------------------------------------------------------------------------

-- изменяем год выпуска авто
UPDATE Cars
SET Year = 2021
WHERE Id = 1

------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------

-- 5️⃣ Триггер на предотвращение дублирования заказов
-- Запретите клиенту оформлять заказ на один и тот же автомобиль более одного раза.

CREATE TRIGGER DuplicateBlock ON Orders
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @CustomerId int;
    DECLARE @CarId int;

    set @CustomerId = (SELECT CustomerId FROM inserted);
    set @CarId = (SELECT CarId FROM inserted);

    IF EXISTS (SELECT 1 FROM Orders WHERE CarId = @CarId AND CustomerId = @CustomerId)
    BEGIN
        print('This customer has already ordered this car.');
        ROLLBACK TRANSACTION;
    END
END

------------------------------------------------------------------------------------------------------------------------

INSERT INTO Orders(CustomerId, CarId)
VALUES (3, 3)