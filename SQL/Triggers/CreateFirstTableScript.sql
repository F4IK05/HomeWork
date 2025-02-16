CREATE DATABASE Academy

USE Academy

CREATE TABLE Students
(
    [Id] int identity (1,1) PRIMARY KEY,
    [Name] nvarchar(max) NOT NULL CHECK (LEN(Name) > 0),
    [Surname] nvarchar(max) NOT NULL CHECK (LEN(Surname) > 0),
    [Email] nvarchar(100) NOT NULL CHECK (LEN(Email) > 0) UNIQUE
)

CREATE TABLE Groups
(
    [Id] int identity (1,1) PRIMARY KEY,
    [GroupName] nvarchar(10) NOT NULL CHECK (LEN(GroupName) > 0) UNIQUE,
    [Year] int NOT NULL CHECK (Year BETWEEN 1 AND 5)
)

CREATE TABLE StudentsGroups
(
    [Id] int identity (1,1) PRIMARY KEY,
    [StudentId] int FOREIGN KEY REFERENCES Students(Id),
    [GroupId] int FOREIGN KEY REFERENCES Groups(Id)
)