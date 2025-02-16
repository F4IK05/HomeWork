-- 1. Ограничение количества студентов в группе
-- Создайте триггер, который запрещает добавление нового студента в группу, если в ней уже 5(стояло 30) человек.
use Academy

CREATE TRIGGER CheckCountOfStudents ON StudentsGroups
FOR INSERT, UPDATE
AS
BEGIN
    DECLARE @GroupId int;
    set @GroupId = (SELECT GroupId FROM inserted)


    IF (SELECT COUNT(*) FROM StudentsGroups
        WHERE StudentsGroups.GroupId = @GroupId) > 5
    BEGIN
        print('Limit!');
        ROLLBACK TRANSACTION;
    END
END

------------------------------------------------------------------------------------------------------------------------

-- Добавляю студентов
INSERT INTO Students (Name, Surname, Email)
VALUES ('John', 'Doe', 'john.doe@example.com'),
       ('Jane', 'Smith', 'jane.smith@example.com'),
       ('Alice', 'Johnson', 'alice.johnson@example.com'),
       ('Bob', 'Brown', 'bob.brown@example.com'),
       ('Charlie', 'Davis', 'charlie.davis@example.com'),
       ('David', 'Miller', 'david.miller@example.com'),
       ('Eva', 'Wilson', 'eva.wilson@example.com'),
       ('Frank', 'Moore', 'frank.moore@example.com'),
       ('Grace', 'Taylor', 'grace.taylor@example.com'),
       ('Hannah', 'Anderson', 'hannah.anderson@example.com');

-- Добавляю группы
INSERT INTO Groups (GroupName, Year)
VALUES ('GroupA', 1),
       ('GroupB', 2),
       ('GroupC', 3);

-- Добавляю в группу 'GroupA' - 5 студетов(до предела), 'GroupB' - 2, 'GroupC' - 3
INSERT INTO StudentsGroups (StudentId, GroupId) VALUES (1, 1);
INSERT INTO StudentsGroups (StudentId, GroupId) VALUES (2, 2);
INSERT INTO StudentsGroups (StudentId, GroupId) VALUES (3, 3);
INSERT INTO StudentsGroups (StudentId, GroupId) VALUES (4, 1);
INSERT INTO StudentsGroups (StudentId, GroupId) VALUES (5, 1);
INSERT INTO StudentsGroups (StudentId, GroupId) VALUES (6, 1);
INSERT INTO StudentsGroups (StudentId, GroupId) VALUES (7, 1);
INSERT INTO StudentsGroups (StudentId, GroupId) VALUES (8, 3);
INSERT INTO StudentsGroups (StudentId, GroupId) VALUES (9, 2);
INSERT INTO StudentsGroups (StudentId, GroupId) VALUES (10, 3);

-- Теперь попробую добавить нового студента
INSERT INTO Students (Name, Surname, Email)
VALUES ('Ivy', 'King', 'ivy.king@example.com');

-- И попробую доваить его в 'GroupA'
INSERT INTO StudentsGroups (StudentId, GroupId) VALUES (11, 1);



-- Но я все еще могу добавить его в группы 'GroupB' или 'GroupC'
INSERT INTO StudentsGroups (StudentId, GroupId) VALUES (11, 2);

------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------

-- 2. Обновление количества студентов в группе
-- Напишите триггер, который автоматически обновляет поле StudentsCount в таблице Group при добавлении или удалении студента.

-- Для этого я добавлю новое поле в Groups
ALTER TABLE Groups
ADD StudentsCount int NOT NULL DEFAULT 0;

------------------------------------------------------------------------------------------------------------------------

CREATE TRIGGER AutoUpdate ON StudentsGroups
FOR INSERT, DELETE
AS
BEGIN
    DECLARE @GroupId int;
    set @GroupId = (SELECT GroupId FROM inserted)

    UPDATE Groups
    SET StudentsCount = (SELECT COUNT(*) FROM StudentsGroups WHERE StudentsGroups.GroupId = @GroupId)
    WHERE Id = @GroupId
END

-- Добавляю нового студента в 'GroupC'
INSERT INTO Students (Name, Surname, Email)
VALUES (N'Алексей', N'Смирнов', 'alexey.smirnov@example.com');

INSERT INTO StudentsGroups (StudentId, GroupId)
VALUES (12, 3)

-- После этого зн-е DEFAULT 0 в т. Groups сменилось на 4(общее количество в 'Group')

------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------

-- 3. Автоматическая регистрация студента на общий курс
-- Создайте триггер, который при добавлении нового студента автоматически добавляет его в курс "Введение в программирование"
-- (если такой курс существует).

-- Для этого надо создать несколько новых таблиц, а именно 'Teachers', 'Courses', 'StudentsCourses'

CREATE TABLE Teachers
(
    [Id] int identity(1,1) PRIMARY KEY,
    [Name] nvarchar(max) NOT NULL,
    [Surname] nvarchar(max) NOT NULL,
    [Email] nvarchar(100) NOT NULL UNIQUE
);

CREATE TABLE Courses
(
    [Id] int identity(1,1) PRIMARY KEY,
    [CourseName] nvarchar(100) NOT NULL UNIQUE,
    [TeacherId] int NULL FOREIGN KEY REFERENCES Teachers(Id)
);

CREATE TABLE StudentsCourses
(
    [Id] int identity(1,1) PRIMARY KEY,
    [StudentId] int FOREIGN KEY REFERENCES Students(Id),
    [CourseId] int FOREIGN KEY REFERENCES Courses(Id)
)

------------------------------------------------------------------------------------------------------------------------

-- До этого добавим:

INSERT INTO Courses (CourseName)
VALUES (N'Введение в программирование');

------------------------------------------------------------------------------------------------------------------------

CREATE TRIGGER AutoRegister ON Students
FOR INSERT
AS
BEGIN
    DECLARE @StudentId int;
    set @StudentId = (SELECT Id FROM inserted)

    IF EXISTS(SELECT 1 FROM Courses WHERE CourseName = N'Введение в программирование')
    BEGIN
        INSERT INTO StudentsCourses (StudentId, CourseId)
        SELECT @StudentId, Id FROM Courses WHERE CourseName = N'Введение в программирование'
    END
END

------------------------------------------------------------------------------------------------------------------------

-- Добавим нового студента
INSERT INTO Students (Name, Surname, Email)
VALUES (N'Ольга', N'Иванова', 'olga.ivanova@example.com');

-- Информация в StudentsCourses обновилась

------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------

-- 4. Предупреждение о низкой оценке
-- Реализуйте триггер, который при вставке или обновлении оценки в таблице Grade проверяет, если оценка ниже 3,
-- то добавляет запись в таблицу Warnings (StudentId, Reason, Date).

-- Для этого надо создать несколько новых таблиц
CREATE TABLE Grades
(
    [Id] int identity(1,1) PRIMARY KEY,
    [StudentId] int FOREIGN KEY REFERENCES Students(Id),
    [CourseId] int FOREIGN KEY REFERENCES Courses(Id),
    [Grade] int NOT NULL CHECK (Grade BETWEEN 1 AND 5),
    [Date] date NOT NULL
);

CREATE TABLE Warnings
(
    [Id] int identity(1,1) PRIMARY KEY,
    [StudentId] int FOREIGN KEY REFERENCES Students(Id),
    [Reason] nvarchar(max) NOT NULL,
    [Date] date NOT NULL
);

------------------------------------------------------------------------------------------------------------------------

CREATE TRIGGER WarningLowGrade ON Grades
FOR INSERT, UPDATE
AS
BEGIN
    DECLARE @Grade int;
    DECLARE @StudentId int;

    set @Grade = (SELECT Grade FROM inserted);
    set @StudentId = (SELECT StudentId FROM inserted)

    IF (@Grade) < 3
    BEGIN
       INSERT INTO Warnings (StudentId, Reason, Date)
       VALUES (@StudentId, 'Low Grade', GETDATE())
    END
END

------------------------------------------------------------------------------------------------------------------------

-- Добавил инфо в Grades
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (1, 1, 4, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (2, 1, 5, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (3, 1, 2, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (4, 1, 3, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (5, 1, 4, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (6, 1, 2, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (7, 1, 5, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (8, 1, 3, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (9, 1, 4, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (10, 1, 5, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (11, 1, 2, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (12, 1, 4, GETDATE());

-- Теперь студенты у которых оценка ниже 3 заносятся в таблицу Warnings

------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------

-- 5. Запрет удаления учителей с курсами
-- Создайте триггер, который запрещает удаление преподавателя, если за ним закреплены активные курсы.

CREATE TRIGGER TeachersDeleteBlock ON Teachers
INSTEAD OF DELETE -- До этого здесь стояло FOR, я его поменял так как здесь требуют 'запретить'(также и в 8)
AS
BEGIN
    DECLARE @TeacherId int;
    set @TeacherId = (SELECT Id FROM deleted)

    IF EXISTS (SELECT 1 FROM Courses WHERE @TeacherId = TeacherId AND TeacherId IS NOT NULL)
    BEGIN
       print('Teacher has active course');
       ROLLBACK TRANSACTION;
    END
END


-- Добавлю учителя
INSERT INTO Teachers (Name, Surname, Email)
VALUES (N'Сергей', N'Петров', 'sergey.petrov@example.com');

-- Привяжу его к курсу 'Введение в программирование'
UPDATE Courses
SET TeacherId = 1
WHERE CourseName = N'Введение в программирование';

-- Попробую удалить преподавателя
DELETE FROM Teachers
WHERE Id = 1;

-- По факту он не даст, но в моем случае есть FOREIGN KEY который и так не даст его удалить из-за связи

------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------

-- 6. История изменений оценок
-- Разработайте триггер, который при обновлении таблицы Grade сохраняет старое значение в таблице GradeHistory
-- с указанием времени изменения.

-- Новая таблица

CREATE TABLE GradeHistory
(
    [Id] int identity(1,1) PRIMARY KEY,
    [StudentId] int FOREIGN KEY REFERENCES Students(Id),
    [OldGrade] int,
    [ChangeDate] datetime DEFAULT GETDATE()
);

------------------------------------------------------------------------------------------------------------------------

CREATE TRIGGER GradeHistoryChanges ON Grades
FOR UPDATE
AS
BEGIN
    DECLARE @OldGrade int;
    DECLARE @NewGrade int;
    DECLARE @StudentId int;

    set @OldGrade = (SELECT Grade FROM deleted);
    set @NewGrade = (SELECT Grade FROM inserted);
    set @StudentId = (SELECT Id FROM deleted);

    IF (@OldGrade != @NewGrade)
    BEGIN
        INSERT INTO GradeHistory (StudentId, OldGrade, ChangeDate)
        VALUES (@StudentId, @OldGrade, GETDATE())
    END
END

------------------------------------------------------------------------------------------------------------------------

-- Изменим оценку студентам
UPDATE Grades
SET Grade = 5
WHERE StudentId = 1 AND CourseId = 1;

-- Специально не менял
UPDATE Grades
SET Grade = 2
WHERE StudentId = 3 AND CourseId = 1;

------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------

-- 7. Контроль пропусков занятий
-- Создайте триггер, который при добавлении записи о пропуске занятия (Attendance) проверяет,
-- если студент пропустил более 5 занятий подряд, то добавляет его в список на пересдачу (RetakeList).

CREATE TABLE Attendance
(
    [Id] int identity(1,1) PRIMARY KEY,
    [StudentId] int FOREIGN KEY REFERENCES Students(Id),
    [CourseId] int FOREIGN KEY REFERENCES Courses(Id),
    [Date] date NOT NULL,
    [IsPresent] bit NOT NULL
);

CREATE TABLE RetakeList
(
    [Id] int IDENTITY(1,1) PRIMARY KEY,
    [StudentId] int FOREIGN KEY REFERENCES Students(Id)
);

------------------------------------------------------------------------------------------------------------------------

CREATE TRIGGER AttendanceСontrol ON Attendance
FOR INSERT
AS
BEGIN
    DECLARE @StudentId int;
    DECLARE @AbsentDays int;

    set @StudentId = (SELECT StudentId FROM inserted);
    set @AbsentDays = (
        SELECT DISTINCT COUNT(*)
        FROM (
            SELECT TOP 5 Attendance.Date FROM Attendance
            WHERE Attendance.StudentId = @StudentId AND IsPresent = 0) AS AbsentDays
    )

    IF (@AbsentDays) = 5
    BEGIN
        INSERT INTO RetakeList (StudentId)
        VALUES (@StudentId)
    END
END

------------------------------------------------------------------------------------------------------------------------

-- 6 пропусков
INSERT INTO Attendance (StudentId, CourseId, Date, IsPresent) VALUES (1, 1, '2025-02-01', 0);
INSERT INTO Attendance (StudentId, CourseId, Date, IsPresent) VALUES (1, 1, '2025-02-02', 0);
INSERT INTO Attendance (StudentId, CourseId, Date, IsPresent) VALUES (1, 1, '2025-02-03', 0);
INSERT INTO Attendance (StudentId, CourseId, Date, IsPresent) VALUES (1, 1, '2025-02-04', 0);
INSERT INTO Attendance (StudentId, CourseId, Date, IsPresent) VALUES (1, 1, '2025-02-05', 0);
INSERT INTO Attendance (StudentId, CourseId, Date, IsPresent) VALUES (1, 1, '2025-02-06', 0);

-- Пропуски не подряд
INSERT INTO Attendance (StudentId, CourseId, Date, IsPresent) VALUES (2, 1, '2025-02-01', 1);
INSERT INTO Attendance (StudentId, CourseId, Date, IsPresent) VALUES (2, 1, '2025-02-02', 0);
INSERT INTO Attendance (StudentId, CourseId, Date, IsPresent) VALUES (2, 1, '2025-02-03', 1);
INSERT INTO Attendance (StudentId, CourseId, Date, IsPresent) VALUES (2, 1, '2025-02-04', 0);
INSERT INTO Attendance (StudentId, CourseId, Date, IsPresent) VALUES (2, 1, '2025-02-05', 1);

------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------

-- 8. Запрет удаления студентов с долгами
-- Напишите триггер, который запрещает удаление студента, если у него есть задолженности по оплате (Payments)
-- или неудовлетворительные оценки.

CREATE TABLE Payments
(
    [Id] int identity(1,1) PRIMARY KEY,
    [StudentId] int FOREIGN KEY REFERENCES Students(Id),
    [Amount] decimal(10,2) NOT NULL,
    [PaymentDate] date NOT NULL,
    [IsPaid] bit NOT NULL DEFAULT 0
);

------------------------------------------------------------------------------------------------------------------------

CREATE TRIGGER StudentDeleteBlock ON Students
INSTEAD OF DELETE
AS
BEGIN
    DECLARE @StudentId int;
    SET @StudentId = (SELECT Id FROM deleted)

    IF EXISTS (SELECT 1 FROM Payments WHERE @StudentId = Payments.StudentId AND IsPaid = 0)
    OR EXISTS (SELECT 1 FROM Grades WHERE @StudentId = Grades.StudentId AND Grade < 3)
    BEGIN
        print ('Cannot delete student with outstanding payments or unsatisfactory grades');
        ROLLBACK TRANSACTION;
    END
END

------------------------------------------------------------------------------------------------------------------------

INSERT INTO Payments (StudentId, Amount, PaymentDate, IsPaid)
VALUES (1, 5000, '2025-02-15', 0),
       (2, 3000, '2025-02-10', 1),
       (3, 4000, '2025-02-14', 0),
       (4, 3500, '2025-02-12', 1),
       (5, 2500, '2025-02-13', 0);

-- Попытка удаления
DELETE FROM Students
WHERE Id = 1;


------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------

-- 9. Обновление среднего балла студента
-- Создайте триггер, который при добавлении или изменении оценки пересчитывает средний балл студента в таблице Student.

ALTER TABLE Students
ADD AverageGrade float NULL;

------------------------------------------------------------------------------------------------------------------------

CREATE TRIGGER AvgGradeCalc ON Grades
FOR INSERT, UPDATE
AS
BEGIN
    DECLARE @StudentId int;
    DECLARE @AvgGrade float;

    set @StudentId = (SELECT StudentId FROM inserted)
    set @AvgGrade = (SELECT AVG(Grade) FROM Grades WHERE Grades.StudentId = @StudentId)

    UPDATE Students
    SET AverageGrade = @AvgGrade
    WHERE Id = @StudentId
END

------------------------------------------------------------------------------------------------------------------------

INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (1, 1, 5, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (1, 1, 3, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (1, 1, 4, GETDATE());
INSERT INTO Grades (StudentId, CourseId, Grade, Date) VALUES (1, 1, 2, GETDATE());