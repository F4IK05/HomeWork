CREATE DATABASE Academy

USE Academy

CREATE TABLE Curators
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Name] nvarchar(max) NOT NULL CHECK (LEN(Name) > 0),
    [Surname] nvarchar(max) NOT NULL CHECK (LEN(Surname) > 0)
)

CREATE TABLE Faculties
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Name] nvarchar(100) NOT NULL CHECK (Name <> '') UNIQUE
)

CREATE TABLE Departments
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Building] int NOT NULL CHECK (Building >= 1 AND Building <= 5),
    [Financing] money NOT NULL DEFAULT 0 CHECK (Financing >= 0),
    [Name] nvarchar(100) NOT NULL CHECK (LEN(Name) > 0) UNIQUE,
    [FacultyId] int NOT NULL FOREIGN KEY REFERENCES Faculties(Id)
)

CREATE TABLE Groups
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Name] nvarchar(10) NOT NULL CHECK (LEN(Name) > 0) UNIQUE,
    [Year] int NOT NULL CHECK (Year >= 1 AND Year <= 5),
    [DepartmentId] int NOT NULL FOREIGN KEY REFERENCES Departments(Id)
)

CREATE TABLE GroupsCurators
(
    [Id] int identity(1,1) PRIMARY KEY,
    [CuratorId] int NOT NULL FOREIGN KEY REFERENCES Curators(Id),
    [GroupId] int NOT NULL FOREIGN KEY REFERENCES Groups(Id)
)

CREATE TABLE Subjects
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Name] nvarchar(100) NOT NULL CHECK (LEN(Name) > 0) UNIQUE
)

CREATE TABLE Teachers
(
    [Id] int identity(1,1) PRIMARY KEY,
    [IsProfessor] bit NOT NULL DEFAULT 0,
    [Name] nvarchar(max) NOT NULL CHECK (LEN(Name) > 0),
    [Surname] nvarchar(max) NOT NULL CHECK (LEN(Surname) > 0),
    [Salary] money NOT NULL CHECK (Salary > 0)
)

CREATE TABLE Lectures
(
    [Id] int identity (1,1) PRIMARY KEY,
    [Date] date NOT NULL CHECK (Date <= GETDATE()),
    [SubjectId] int NOT NULL FOREIGN KEY REFERENCES Subjects(Id),
    [TeacherId] int NOT NULL FOREIGN KEY REFERENCES Teachers(Id)
)

CREATE TABLE GroupsLectures
(
    [Id] int identity(1,1) PRIMARY KEY,
    [GroupId] int NOT NULL FOREIGN KEY REFERENCES Groups(Id),
    [LectureId] int NOT NULL FOREIGN KEY REFERENCES Lectures(Id)
)

CREATE TABLE Students
(
    [Id] int identity (1,1) PRIMARY KEY,
    [Name] nvarchar(max) NOT NULL CHECK (LEN(Name) > 0),
    [Surname] nvarchar(max) NOT NULL CHECK (LEN(Surname) > 0),
    [Rating] int NOT NULL CHECK (Rating >= 0 AND Rating <= 5)
)

CREATE TABLE GroupsStudents
(
    [Id] int identity(1,1) PRIMARY KEY,
    [GroupId] int NOT NULL FOREIGN KEY REFERENCES Groups(Id),
    [StudentId] int NOT NULL FOREIGN KEY REFERENCES Students(Id)
)
