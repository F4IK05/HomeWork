CREATE DATABASE CarDealership;

USE CarDealership

-- Таблица клиентов
CREATE TABLE Customers (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Phone NVARCHAR(20) NOT NULL
);

-- Таблица автомобилей
CREATE TABLE Cars (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Brand NVARCHAR(50) NOT NULL,
    Model NVARCHAR(50) NOT NULL,
    Year INT CHECK (Year >= 2000),
    Price DECIMAL(10,2) CHECK (Price > 0)
);

-- Таблица заказов
CREATE TABLE Orders (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CustomerId INT FOREIGN KEY REFERENCES Customers(Id) ON DELETE CASCADE,
    CarId INT FOREIGN KEY REFERENCES Cars(Id) ON DELETE CASCADE,
    OrderDate DATETIME DEFAULT GETDATE()
);

-- Таблица истории цен автомобилей
CREATE TABLE CarPriceHistory (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CarId INT FOREIGN KEY REFERENCES Cars(Id) ON DELETE CASCADE,
    OldPrice DECIMAL(10,2),
    NewPrice DECIMAL(10,2),
    ChangeDate DATETIME DEFAULT GETDATE()
);

-- Таблица логов удалённых заказов
CREATE TABLE DeletedOrdersLog (
    Id INT PRIMARY KEY IDENTITY(1,1),
    OrderId INT,
    CustomerId INT,
    CarId INT,
    OrderDate DATETIME,
    DeletedAt DATETIME DEFAULT GETDATE()
);