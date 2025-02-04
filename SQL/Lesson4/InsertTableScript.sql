INSERT INTO Faculties (Name, Financing)
VALUES ('Computer Science', 50000),
       ('Mathematics', 30000);

INSERT INTO Departments (Name, Financing, FacultyId)
VALUES ('Software Engineering', 120000, 1),
       ('Data Science', 15000, 1),
       ('Applied Math', 10000, 2);

INSERT INTO Groups (Name, Year, DepartmentId)
VALUES ('P107', 3, 1),
       ('P108', 5, 2),
       ('M201', 5, 3);

INSERT INTO Curators (Name, Surname)
VALUES ('John', 'Doe'),
       ('Emily', 'Clark');

INSERT INTO Teachers (Name, Surname, Salary)
VALUES ('Samantha', 'Adams', 4000),
       ('Michael', 'Brown', 3500);

INSERT INTO Subjects (Name)
VALUES ('Database Theory'),
       ('Algorithms'),
       ('Linear Algebra');

INSERT INTO Lectures (LectureRoom, SubjectId, TeacherId)
VALUES ('B103', 1, 1),
       ('A201', 2, 2),
       ('B103', 3, 2);

INSERT INTO GroupsCurators (CuratorId, GroupId)
VALUES (1, 1),
       (2, 2);

INSERT INTO GroupsLectures (GroupId, LectureId)
VALUES (1, 1),
       (2, 2),
       (3, 3);
