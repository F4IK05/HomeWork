CREATE DATABASE Academy

USE Academy

CREATE TABLE Departments
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Financing] money NOT NULL CHECK (Financing >= 0) DEFAULT 0,
    [Name] nvarchar(100) NOT NULL CHECK (Name <> '') UNIQUE
)

CREATE TABLE Faculties
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Dean] nvarchar(max) NOT NULL CHECK (Dean <> ''),
    [Name] nvarchar(100) NOT NULL CHECK (Name <> '') UNIQUE
)

CREATE TABLE Groups
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Name] nvarchar(10) NOT NULL CHECK (Name <> '') UNIQUE,
    [Rating] int NOT NULL CHECK (Rating >= 0 AND Rating <= 5),
    [Year] int NOT NULL CHECK (Year >= 1 AND Year <= 5)
)

CREATE TABLE Teachers
(
    [Id] int identity(1,1) PRIMARY KEY,
    [EmploymentDate] date NOT NULL CHECK (EmploymentDate >= '1990-01-01'),
    [IsAssistant] bit NOT NULL DEFAULT 0,
    [IsProfessor] bit NOT NULL DEFAULT 0,
    [Name] nvarchar(max) NOT NULL CHECK (Name <> ''),
    [Surname] nvarchar(max) NOT NULL CHECK (Surname <> ''),
    [Position] nvarchar(max) NOT NULL CHECK (Position <> ''),
    [Premium] money NOT NULL CHECK (Premium >= 0) DEFAULT 0,
    [Salary] money NOT NULL CHECK (Salary > 0)
)