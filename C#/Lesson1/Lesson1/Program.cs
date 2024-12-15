// Task1

Console.WriteLine("Enter number:");

int number = int.Parse(Console.ReadLine());

if (number < 1 || number > 100)
{
    Console.WriteLine("Invalid number");
}
else
{
    if (number % 3 == 0 && number % 5 == 0)
    {
        Console.WriteLine("FizzBuzz");
    }
    else if (number % 3 == 0)
    {
        Console.WriteLine("Fizz");
    } 
    else if (number % 5 == 0)
    {
        Console.WriteLine("Buzz");
    }
    else
    {
        Console.WriteLine(number);
    }
    
}

// ===============================================================

// Task2

// Console.Write("Enter first number:");
// int firstNumber = int.Parse(Console.ReadLine());
// Console.Write("Enter second number:");
// int secondNumber = int.Parse(Console.ReadLine());
//
// double result = firstNumber * (secondNumber/100.0);
// Console.WriteLine($"{secondNumber}% of {firstNumber} is {result}");

// ===============================================================

// Task3

// Console.Write("Enter first number:");
// int firstNumber = int.Parse(Console.ReadLine());
// Console.Write("Enter second number:");
// int secondNumber = int.Parse(Console.ReadLine());
// Console.Write("Enter third number:");
// int thirdNumber = int.Parse(Console.ReadLine());
// Console.Write("Enter fourth number:");
// int fourthNumber = int.Parse(Console.ReadLine());
//
// int finalNumber = firstNumber * 1000 + secondNumber * 100 + thirdNumber * 10 + fourthNumber;
// Console.WriteLine($"Final number: {finalNumber}");

// ===============================================================

// Task4

// Console.Write("Enter 6-digit number: ");
//
// int num = int.Parse(Console.ReadLine());
//
// if (num.ToString().Length == 6)
// {
//     
//     Console.WriteLine($"Your number is {num}");
//
//     Console.WriteLine("Enter first index for replacement(1-6): ");
//     int firstIndex = int.Parse(Console.ReadLine());
//     Console.WriteLine("Enter second index for replacement(1-6): ");
//     int secondIndex = int.Parse(Console.ReadLine());
//
//     if (firstIndex > 6 || firstIndex < 1 || secondIndex > 6 || secondIndex < 1 )
//     {
//         Console.WriteLine("Invalid input.");
//     }
//     else
//     {
//         int firstDigit = (num / 100000) % 10;
//         int secondDigit = (num / 10000) % 10;
//         int thirdDigit = (num / 1000) % 10;
//         int fourthDigit = (num / 100) % 10;
//         int fifthDigit = (num / 10) % 10;
//         int sixthDigit = num % 10;
//         
//         int[] digits = {firstDigit, secondDigit, thirdDigit, fourthDigit, fifthDigit, sixthDigit};
//         
//         int temp = digits[firstIndex - 1];
//         digits[firstIndex - 1] = digits[secondIndex - 1];
//         digits[secondIndex - 1] = temp;
//         
//         int finalDigit = digits[0] * 100000 + digits[1] * 10000 + digits[2] * 1000 + digits[3] * 100 + digits[4] * 10  + digits[5];
//         
//         Console.WriteLine($"The final number is {finalDigit}");
//
//     }
// }
// else
// {
//     Console.WriteLine("Invalid number");
// }

// ===============================================================

// Task5

// Console.WriteLine("Enter date(day):");
// int day = int.Parse(Console.ReadLine());
//
// if (day < 1 || day > 30) // я не придумал как оформлять месяци с 31 днем 
// {
//     Console.WriteLine("Invalid!");
//     
// }
// else
// {
//     Console.WriteLine("Enter date(month):");
//
//     int month = int.Parse(Console.ReadLine());
//
//     if (month < 1 || month > 12)
//     {
//         Console.WriteLine("Invalid!");
//     }
//     else
//     {
//         Console.WriteLine("Enter date(year(yyyy)):");
//
//         int year = int.Parse(Console.ReadLine());
//
//         if (year.ToString().Length != 4)
//         {
//             Console.WriteLine("Invalid!");
//         
//         }
//
//         else
//         {
//             if (month >= 3 && month <= 5)
//             {
//                 Console.Write("Spring ");
//             } 
//             else if (month >= 6 && month <= 8)
//             {
//                 Console.Write("Summer ");
//             }
//             else if (month >= 9 && month <= 11)
//             {
//                 Console.Write("Autumn ");
//             }
//             else if (month == 1 || month == 12)
//             {
//                 Console.Write("Winter ");
//             }
//
//             string[] weekDay = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};
//
//             string Day = weekDay[day % 7];
//             
//             Console.WriteLine(Day);
//         }
//     }
//     
// }

// ===============================================================

// Task6

// Console.Write("Enter temperature: ");
// double temperature = double.Parse(Console.ReadLine());
//
// Console.Write("\n1. F to C\n2. C to F\n");
// char choice = char.Parse(Console.ReadLine());
//
// switch (choice)
// {
//     case '1':
//         temperature = 5.0 / 9.0 * (temperature - 32);
//         Console.WriteLine($"\nTemperature: {temperature}C");
//         break;
//     case '2':
//         temperature = (9.0 / 5.0) * temperature + 32;
//         Console.WriteLine($"\nTemperature: {temperature}F");
//         break;
// }


// ===============================================================

// Task7

// Console.WriteLine("Enter the start of the range: ");
// int start = int.Parse(Console.ReadLine());
// Console.WriteLine("Enter the end of the range: ");
// int end = int.Parse(Console.ReadLine());
//
// if (start > end)
// {
//     int temp = start;
//     start = end;
//     end = temp;
// }
//
// for (int i = start; i <= end; i++)
// {
//     if (i % 2 == 0)
//     {
//         Console.Write($"{i} ");
//     }
//
//     
// }