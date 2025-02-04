CREATE DATABASE Academy

USE Academy

CREATE TABLE Faculties
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Financing] money NOT NULL DEFAULT 0 CHECK (Financing >= 0),
    [Name] nvarchar(100) NOT NULL CHECK (Name <> '') UNIQUE
)

CREATE TABLE Departments
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Financing] money NOT NULL DEFAULT 0 CHECK (Financing >= 0),
    [Name] nvarchar(100) NOT NULL CHECK (Name <> '') UNIQUE,
    [FacultyId] int NOT NULL FOREIGN KEY REFERENCES Faculties(Id)
)

CREATE TABLE Curators
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Name] nvarchar(max) NOT NULL CHECK (Name <> ''),
    [Surname] nvarchar(max) NOT NULL CHECK (Surname <> '')
)

CREATE TABLE Groups
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Name] nvarchar(10) NOT NULL CHECK (Name <> '') UNIQUE,
    [Year] int NOT NULL CHECK (Year >= 1 AND Year <= 5),
    [DepartmentId] int NOT NULL FOREIGN KEY REFERENCES Departments(Id)
)

CREATE TABLE Teachers
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Name] nvarchar(max) NOT NULL CHECK (Name <> ''),
    [Surname] nvarchar(max) NOT NULL CHECK (Surname <> ''),
    [Salary] money NOT NULL CHECK (Salary > 0)
)

CREATE TABLE Subjects
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Name] nvarchar(100) NOT NULL CHECK (Name <> '') UNIQUE
)

CREATE TABLE Lectures
(
    [Id] int identity(1,1) PRIMARY KEY,
    [LectureRoom] nvarchar(max) NOT NULL CHECK (LectureRoom <> ''),
    [SubjectId] int NOT NULL FOREIGN KEY REFERENCES Subjects(Id),
    [TeacherId] int NOT NULL FOREIGN KEY REFERENCES Teachers(Id)
)

CREATE TABLE GroupsCurators
(
    [Id] int identity(1,1) PRIMARY KEY,
    [CuratorId] int NOT NULL FOREIGN KEY REFERENCES Curators(Id),
    [GroupId] int NOT NULL FOREIGN KEY REFERENCES Groups(Id)
)

CREATE TABLE GroupsLectures
(
    [Id] int identity(1,1) PRIMARY KEY,
    [GroupId] int NOT NULL FOREIGN KEY REFERENCES Groups(Id),
    [LectureId] int NOT NULL FOREIGN KEY REFERENCES Lectures(Id)
)

