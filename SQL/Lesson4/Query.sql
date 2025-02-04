-- 1. Вывести все возможные пары строк преподавателей и групп.

SELECT * FROM Teachers, Groups

-- 2. Вывести названия факультетов, фонд финансирования кафедр которых превышает фонд финансирования факультета.

SELECT Faculties.Name AS FacultyName FROM Faculties
JOIN Departments ON Faculties.Id = Departments.FacultyId
WHERE (Departments.Financing > Faculties.Financing)

-- 3. Вывести фамилии кураторов групп и названия групп, которые они курируют.

SELECT Curators.Surname AS CuratorSurname, Groups.Name AS GroupName FROM Curators
JOIN GroupsCurators On GroupsCurators.CuratorId = Curators.Id
JOIN Groups ON Groups.Id = GroupsCurators.CuratorId

-- 4. Вывести имена и фамилии преподавателей, которые читают лекции у группы “P107”.

SELECT Teachers.Name + ' ' + Teachers.Surname AS TFullName FROM Teachers
JOIN Lectures ON Teachers.Id = Lectures.TeacherId
JOIN GroupsLectures ON Lectures.Id = GroupsLectures.LectureId
JOIN Groups ON GroupsLectures.GroupId = Groups.Id
WHERE Groups.Name = 'P107'

-- 5. Вывести фамилии преподавателей и названия факультетов на которых они читают лекции.

SELECT Teachers.Surname AS TeacherSurname, Faculties.Name AS FacultyName FROM Teachers
JOIN Lectures ON Teachers.Id = Lectures.TeacherId
JOIN GroupsLectures ON Lectures.Id = GroupsLectures.LectureId
JOIN Groups ON GroupsLectures.GroupId = Groups.Id
JOIN Departments ON Groups.DepartmentId = Departments.Id
JOIN Faculties ON Departments.FacultyId = Faculties.Id

-- 6. Вывести названия кафедр и названия групп, которые к ним относятся.

SELECT Departments.Name AS DepartamentName, Groups.Name AS GroupName FROM Departments
JOIN Groups ON Departments.Id = Groups.DepartmentId

-- 7. Вывести названия дисциплин, которые читает преподаватель “Samantha Adams”.

SELECT Subjects.Name AS SubjectName FROM Subjects
JOIN Lectures ON Subjects.Id = Lectures.SubjectId
JOIN Teachers ON Teachers.Id = Lectures.TeacherId
WHERE Teachers.Name = 'Samantha' AND Teachers.Surname = 'Adams'

-- 8. Вывести названия кафедр, на которых читается дисциплина “Database Theory”.

SELECT Departments.Name AS DepartamentName FROM Departments
JOIN Groups ON Departments.Id = Groups.DepartmentId
JOIN GroupsLectures ON Groups.Id = GroupsLectures.GroupId
JOIN Lectures ON GroupsLectures.LectureId = Lectures.Id
JOIN Subjects ON Lectures.SubjectId = Subjects.Id
WHERE Subjects.Name = 'Database Theory'

-- 9. Вывести названия групп, которые относятся к факультету “Computer Science”.

SELECT Groups.Name AS GroupName FROM Groups
JOIN Departments ON Groups.DepartmentId = Departments.Id
JOIN Faculties ON Departments.FacultyId = Faculties.Id
WHERE Faculties.Name = 'Computer Science'

-- 10. Вывести названия групп 5-го курса, а также название факультетов, к которым они относятся.

SELECT Groups.Name AS GroupName, Faculties.Name AS FacultyName FROM Groups
JOIN Departments ON Groups.DepartmentId = Departments.Id
JOIN Faculties ON Faculties.Id = Departments.FacultyId
WHERE Year = 5

-- 11. Вывести полные имена преподавателей и лекции, которые они читают (названия дисциплин и групп), причем отобрать
-- только те лекции, которые читаются в аудитории “B103”.

SELECT Teachers.Name + ' ' + Teachers.Surname AS TFullName, Subjects.Name AS SubjectName, Groups.Name AS GroupName FROM Teachers
JOIN Lectures ON Teachers.Id = Lectures.TeacherId
JOIN Subjects ON Lectures.SubjectId = Subjects.Id
JOIN GroupsLectures ON Lectures.Id = GroupsLectures.LectureId
JOIN Groups ON GroupsLectures.GroupId = Groups.Id
WHERE LectureRoom = 'B103'