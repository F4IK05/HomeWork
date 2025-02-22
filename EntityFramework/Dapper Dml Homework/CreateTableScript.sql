CREATE DATABASE Showroom

USE Showroom

CREATE TABLE Cars
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Brand] nvarchar(50) NOT NULL CHECK (LEN(Brand) > 0),
    [Model] nvarchar(50) NOT NULL CHECK (LEN(Model) > 0),
    [Year] int NOT NULL,
    [Price] decimal(10,2) NOT NULL CHECK (Price > 0),
)