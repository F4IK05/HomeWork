-- Добавляем факультеты
INSERT INTO Faculties (Name) VALUES
('Computer Science'),
('Software Development'),
('Mathematics');

-- Добавляем кафедры
INSERT INTO Departments (Building, Financing, Name, FacultyId) VALUES
(1, 150000, 'Computer Science', 1),
(2, 120000, 'Software Development', 2),
(3, 90000, 'Mathematics', 3);

-- Добавляем группы
INSERT INTO Groups (Name, Year, DepartmentId) VALUES
('D221', 5, 1),
('SD301', 5, 2),
('M101', 3, 3),
('SD302', 5, 2);

-- Добавляем кураторов
INSERT INTO Curators (Name, Surname) VALUES
('Ivan', 'Petrov'),
('Elena', 'Smirnova'),
('Alexey', 'Ivanov');

-- Назначаем кураторов группам
INSERT INTO GroupsCurators (CuratorId, GroupId) VALUES
(1, 1), -- D221
(2, 2), -- SD301
(3, 3), -- M101
(2, 2), -- SD301 (двойной куратор)
(1, 4); -- SD302

-- Добавляем предметы
INSERT INTO Subjects (Name) VALUES
('Databases'),
('Algorithms'),
('Software Engineering');

-- Добавляем преподавателей
INSERT INTO Teachers (IsProfessor, Name, Surname, Salary) VALUES
(1, 'Sergey', 'Ivanov', 2000),
(1, 'Anna', 'Kuznetsova', 2500),
(0, 'Dmitry', 'Sokolov', 1800);

-- Добавляем лекции
INSERT INTO Lectures (Date, SubjectId, TeacherId) VALUES
('2024-02-01', 1, 1), -- Databases - Sergey Ivanov
('2024-02-02', 1, 2), -- Databases - Anna Kuznetsova
('2024-02-03', 2, 3), -- Algorithms - Dmitry Sokolov
('2024-02-04', 3, 2), -- Software Engineering - Anna Kuznetsova
('2024-02-05', 1, 1); -- Databases - Sergey Ivanov

-- Привязываем лекции к группам
INSERT INTO GroupsLectures (GroupId, LectureId) VALUES
(1, 1), (1, 2), (1, 3), -- D221
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 1), (2, 2), -- SD301 (более 10 пар)
(3, 3), (3, 4),
(4, 5);

-- Добавляем студентов
INSERT INTO Students (Name, Surname, Rating) VALUES
('Ivan', 'Sidorov', 3),
('Elena', 'Orlova', 4),
('Oleg', 'Vasiliev', 5),
('Mariya', 'Zaytseva', 2),
('Anton', 'Smirnov', 3),
('Ivan', 'Sidorov', 4),
('Elena', 'Orlova', 2),
('Oleg', 'Vasiliev', 5),
('Mariya', 'Zaytseva', 3),
('Anton', 'Smirnov', 4);

-- Привязываем студентов к группам
INSERT INTO GroupsStudents (GroupId, StudentId) VALUES
(1, 1), (1, 2), -- D221
(2, 3), (2, 4), (2, 5), -- SD301
(3, 1), (3, 2), (3, 3), (3, 4), -- M101
(4, 5),
(1, 6), (1, 7),
(2, 8), (2, 9), (2, 10),
(3, 6), (3, 7), (3, 8), (3, 9),
(4, 10);
