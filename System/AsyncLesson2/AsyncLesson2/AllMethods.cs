using AsyncLesson2.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace AsyncLesson2;

public static class AllMethods
{
    public static void AddStudentManually(string name)
    {
        Task.Run(() =>
        {
            using var context = new StudentContext();
            Console.WriteLine($"Thread ID: {Thread.CurrentThread.ManagedThreadId}");
            var user = new Student
            {
                Name = name,
            };
            
            context.Students.Add(user);
            context.SaveChanges();
        }).GetAwaiter().GetResult();
    }

    public static void ShowAllStudentsManually()
    {
        var students = Task.Run(() =>
        {
            using var context = new StudentContext();
            Console.WriteLine($"Thread ID: {Thread.CurrentThread.ManagedThreadId}");
            return context.Students.ToList();
            
        }).GetAwaiter().GetResult();

        foreach (var student in students)
        {
            Console.WriteLine($"{student.Id}: {student.Name}");
        }
    }

    public static async Task AddStudentAsync(string name)
    {
        using var context = new StudentContext();
        Console.WriteLine($"Thread ID: {Thread.CurrentThread.ManagedThreadId}");
        
        var user = new Student
        {
            Name = name,
        };

        context.Students.Add(user);
        await context.SaveChangesAsync();
    }

    public static async Task ShowAllStudentsAsync()
    {
        using var context = new StudentContext();
        Console.WriteLine($"Thread ID: {Thread.CurrentThread.ManagedThreadId}");

        var students = await context.Students.ToListAsync();

        foreach (var student in students)
        {
            Console.WriteLine($"{student.Id}: {student.Name}");
        }
    }
}