using System.Diagnostics;

#region Task1
/*string child = "C:/HomeWork/System/SystemIntroProcesses/ChildProcess/bin/Debug/net8.0/ChildProcess.exe";

ProcessStartInfo psi = new ProcessStartInfo
{
    FileName = child,
    Arguments = "arg1 arg2 arg3",
    RedirectStandardOutput = true,
};

using Process childProcess = new Process { StartInfo = psi };

childProcess.OutputDataReceived += (sender, args) => Console.WriteLine(args.Data);

childProcess.Start();

Console.WriteLine($"Child process with id: {childProcess.Id} started");

childProcess.BeginOutputReadLine();

childProcess.WaitForExit();

Console.WriteLine($"Process with id: {Process.GetCurrentProcess().Id} ended");*/

#endregion

#region Task2

/*Console.WriteLine("Choose option:\n1. Waiting for child process to terminate\n2. Terminate a child process by force");

string option = Console.ReadLine();

string child = "C:/HomeWork/System/SystemIntroProcesses/ChildProcess/bin/Debug/net8.0/ChildProcess.exe";

ProcessStartInfo psi = new ProcessStartInfo
{
    FileName = child,
    Arguments = "arg1 arg2 arg3",
    RedirectStandardInput = true,
};

using Process childProcess = new Process {StartInfo = psi};

childProcess.OutputDataReceived += (sender, args) => Console.WriteLine(args.Data);

childProcess.Start();

Console.WriteLine($"Child process {childProcess.Id} started");

if (option == "1")
{
    childProcess.WaitForExit();
}
else if (option == "2")
{
    if (!childProcess.HasExited) // Проверка на то что не завершился ли процесс раньше
    {
        childProcess.Kill();
        if (childProcess.HasExited) // возможно бесполезная проверка(ведь Kill и так его завершит "силой") 
        {
            Console.WriteLine($"Child process {childProcess.Id} terminated by force");
        }

    }
    
}*/

#endregion

#region Task3

/*string child = "C:/HomeWork/System/SystemIntroProcesses/ChildProcess/bin/Debug/net8.0/ChildProcess.exe";

Console.Write("num1: ");
if (!double.TryParse(Console.ReadLine(), out double a))
{
    Console.WriteLine("Wrong num1");
}

Console.Write("num2: ");
if (!double.TryParse(Console.ReadLine(), out double b))
{
    Console.WriteLine("Wrong num2");
}

Console.WriteLine("Operation(+,-,*,/): ");
string operation = Console.ReadLine();

ProcessStartInfo psi = new ProcessStartInfo
{
    FileName = child,
    Arguments = $"{a} {b} {operation}",
    RedirectStandardOutput = true
};

using Process childProcess = new Process { StartInfo = psi };

childProcess.Start();

childProcess.WaitForExit();

Console.WriteLine(childProcess.StandardOutput.ReadToEnd());*/

#endregion

#region Task4

// Создайте какую-нибудь папку например Test (C:\Test),
// а в ней файл example.txt с любым содержимым(текст, с которого вы будите искать слово)

/*string child = "C:/HomeWork/System/SystemIntroProcesses/ChildProcess/bin/Debug/net8.0/ChildProcess.exe";

Console.Write("Enter file path: ");
string filePath = Console.ReadLine();

Console.Write("Word to search: ");
string word = Console.ReadLine();

ProcessStartInfo psi = new ProcessStartInfo
{
    FileName = child,
    Arguments = $"{filePath} {word}",
    RedirectStandardOutput = true
};

using Process childProcess = new Process { StartInfo = psi };

childProcess.Start();

childProcess.WaitForExit();

Console.WriteLine(childProcess.StandardOutput.ReadToEnd());*/

#endregion