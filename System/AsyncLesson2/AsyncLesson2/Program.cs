using AsyncLesson2;

// AllMethods.AddStudentManually("Faik");
// AllMethods.AddStudentManually("Kok");

// AllMethods.ShowAllStudentsManually();

await AllMethods.AddStudentAsync("Samir");
await AllMethods.AddStudentAsync("Amir");

await AllMethods.ShowAllStudentsAsync();
