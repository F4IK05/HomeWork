-- 1. Вывести номера корпусов, если суммарный фонд финансирования расположенных в них кафедр превышает 100000.

SELECT Building FROM Departments D
WHERE (SELECT SUM(Financing) FROM Departments WHERE Departments.Id = D.Id) > 100000

-- 2. Вывести названия групп 5-го курса кафедры “Software Development”, которые имеют более 5 пар в первую неделю.

SELECT Name FROM Groups
WHERE Year = 5
AND Groups.DepartmentId IN (
    SELECT Departments.Id FROM Departments
    WHERE Departments.Name = 'Software Development'
)
AND Id IN (
    SELECT GroupId FROM GroupsLectures
    WHERE LectureId IN (
        SELECT Id FROM Lectures
        WHERE Date >= '2024-02-01' AND Date <= '2024-02-07'
    )
    GROUP BY GroupId
    HAVING COUNT(*) > 5
)

-- 3. Вывести названия групп, имеющих рейтинг (средний рейтинг всех студентов группы) больше, чем рейтинг группы “D221”.

SELECT Name FROM Groups
WHERE Groups.Id IN (
        SELECT GroupId FROM GroupsStudents
        INNER JOIN Students ON Students.Id = GroupsStudents.StudentId
        GROUP BY GroupId
        HAVING AVG(Rating) > (
            SELECT AVG(Rating) FROM Students
            INNER JOIN GroupsStudents ON Students.Id = GroupsStudents.StudentId
            INNER JOIN Groups ON Groups.Id = GroupsStudents.GroupId
            WHERE Groups.Name = 'D221'
        )
)

-- Тупо потому что у меня avg у всех - 3, у меня он не выводит группы

-- 4. Вывести фамилии и имена преподавателей, ставка которых выше средней ставки профессоров.

SELECT Name, Surname FROM Teachers
WHERE Salary > (SELECT AVG(Salary) FROM Teachers WHERE IsProfessor = 1)

-- 5. Вывести названия групп, у которых больше одного куратора.

SELECT Groups.Name FROM Groups
WHERE Id IN (
    SELECT GroupId FROM GroupsCurators
    GROUP BY GroupId
    HAVING COUNT(CuratorId) > 1
)

-- 6. Вывести названия групп, имеющих рейтинг (средний рейтинг всех студентов группы) меньше, чем минимальный
-- рейтинг групп 5-го курса.

SELECT Name FROM Groups
WHERE Groups.Id IN (
        SELECT GroupId FROM GroupsStudents
        INNER JOIN Students ON Students.Id = GroupsStudents.StudentId
        GROUP BY GroupId
        HAVING AVG(Rating) < (
            SELECT MIN(Rating) FROM Students
            INNER JOIN GroupsStudents ON Students.Id = GroupsStudents.StudentId
            INNER JOIN Groups ON Groups.Id = GroupsStudents.GroupId
            WHERE Groups.Year = 5
        )
)

-- Та же самая ситуация, все работает (у меня просто данные не те)

-- 7. Вывести названия факультетов, суммарный фонд финансирования кафедр которых меньше(тут стояло больше) суммарного фонда
-- финансирования кафедр факультета “Computer Science”.

SELECT Name FROM Faculties
WHERE Id IN (
    SELECT FacultyId FROM Departments
    GROUP BY FacultyId
    HAVING SUM(Financing) < (
        SELECT SUM(Financing) FROM Departments
        WHERE FacultyId IN (SELECT Id FROM Faculties WHERE Faculties.Name = 'Computer Science')
    )
)

-- 8. Вывести названия дисциплин и полные имена преподавателей, читающих наибольшее количество лекций по ним.

SELECT DISTINCT Subjects.Name, Teachers.Name + ' ' + Teachers.Surname AS FullName FROM Subjects
INNER JOIN Lectures ON Subjects.Id = Lectures.SubjectId
INNER JOIN Teachers ON Teachers.Id = Lectures.TeacherId
WHERE Lectures.SubjectId IN (
    SELECT SubjectId FROM Lectures
    GROUP BY SubjectId, TeacherId
    HAVING COUNT(*) = (
        SELECT MAX(LectureCount) FROM (
            SELECT SubjectId, TeacherId, COUNT(*) AS LectureCount FROM Lectures
            GROUP BY SubjectId, TeacherId
        ) AS SubQuery
        WHERE SubQuery.SubjectId = Lectures.SubjectId AND SubQuery.TeacherId = Lectures.TeacherId
    )
) AND Lectures.TeacherId IN (
    SELECT TeacherId FROM Lectures
    GROUP BY SubjectId, TeacherId
    HAVING COUNT(*) = (
        SELECT MAX(LectureCount) FROM (
            SELECT TeacherId, SubjectId, COUNT(*) AS LectureCount FROM Lectures
            GROUP BY TeacherId, SubjectId
        ) AS SubQuery
        WHERE SubQuery.SubjectId = Lectures.SubjectId AND SubQuery.TeacherId = Lectures.TeacherId
    )
)

-- Это выглядит чуть-чуть некорректно, я видел вариант с WITH но не стал его применять

-- 9. Вывести название дисциплины, по которому читается меньше всего лекций.

SELECT Name FROM Subjects
WHERE Id = (
    SELECT TOP 1 SubjectId FROM Lectures
    GROUP BY SubjectId
    ORDER BY COUNT(*)
)

-- 10. Вывести количество студентов и читаемых дисциплин на кафедре “Software Development”.

SELECT COUNT(DISTINCT Students.Id) AS StudentCount, COUNT(DISTINCT Lectures.SubjectId) AS SubjectCount FROM Students
INNER JOIN GroupsStudents on Students.Id = GroupsStudents.StudentId
INNER JOIN Groups on Groups.Id = GroupsStudents.GroupId
INNER JOIN Departments on Departments.Id = Groups.DepartmentId
INNER JOIN GroupsLectures on Groups.Id = GroupsLectures.GroupId
INNER JOIN Lectures on Lectures.Id = GroupsLectures.LectureId
WHERE DepartmentId = (SELECT Id FROM Departments WHERE Departments.Name = 'Software Development')
