IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Academy')
    CREATE DATABASE Academy;
GO


USE Academy

CREATE TABLE Teachers
(
    [Id] int identity(1, 1) PRIMARY KEY,
    [EmploymentDate] date NOT NULL CHECK (EmploymentDate >= '1990-01-01'),
    [Name] nvarchar(max) NOT NULL CHECK (Name <> ''),
    [Surname] nvarchar(max) NOT NULL CHECK (Surname <> ''),
    [Premium] money DEFAULT 0 CHECK (Premium >= 0),
    [Salary] money NOT NULL CHECK (Salary > 0)
)

CREATE TABLE Groups
(
    [Id] int identity(1, 1) PRIMARY KEY,
    [Name] nvarchar(10) NOT NULL CHECK (Name <> '') UNIQUE,
    [Rating] int NOT NULL CHECK (Rating >= 0 AND Rating <= 5),
    [Year] int NOT NULL CHECK (Year >= 0 AND Year <= 5)
)

CREATE TABLE Departments
(
    [Id] int identity(1, 1) PRIMARY KEY,
    [Financing] money NOT NULL DEFAULT 0 CHECK (Financing >= 0),
    [Name] nvarchar(100) NOT NULL CHECK (Name <> '') UNIQUE
)

CREATE TABLE Faculties
(
    [Id] int identity(1, 1) PRIMARY KEY,
    [Name] nvarchar(100) NOT NULL CHECK (Name <> '') UNIQUE
)