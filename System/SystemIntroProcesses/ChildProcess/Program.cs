using System.Diagnostics;

#region Task1, Task2

/*Console.WriteLine("Child process started");

foreach (var arg in args)
{
    Console.WriteLine($"Argument received: {arg}");
}

Console.WriteLine($"{Process.GetCurrentProcess().Id} is finished");*/

#endregion

#region Task3

/*if (!double.TryParse(args[0], out double a) || !double.TryParse(args[1], out double b))
{
    Console.WriteLine("Invalid argument");
    return;
}

var operation = args[2];
double result = 0;

switch (operation)
{
    case "+":
        result = a + b;
        break;
    case "-":
        result = a - b;
        break;
    case "*":
        result = a * b;
        break;
    case "/":
        if (b == 0)
        {
            Console.WriteLine("Division by zero");
            break;
        }
        result = a / b;
        break;
    default:
        Console.WriteLine("Invalid operation");
        break;
}

Console.WriteLine($"{a} {operation} {b} = {result}");*/


#endregion

#region Task4

/*int count = 0;
int index = 0;

var filePath = args[0];
var word = args[1];

if (!File.Exists(filePath))
{
    Console.WriteLine("File not found");
}

var content = File.ReadAllText(filePath);

while ((index = content.IndexOf(word, index)) != -1)
{
    count++;
    index += word.Length;
}

Console.WriteLine(count);*/

#endregion