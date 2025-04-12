

using AyncLesson1.Methods;

Random random = new Random();

List<int> nums = new List<int>();

for (int i = 0; i < 20; i++)
{
    
    int number = random.Next(1, 101);
    
    nums.Add(number);
}

Console.WriteLine("Full list:");
AllMethods.PrintNums(nums);

var evenNums = await AllMethods.FilterEvenAsync(nums);
var oddNums = await AllMethods.FilterOddAsync(nums);
var sumNums = await AllMethods.CalculateSumAsync(nums);

Console.Write("\nEven numbers: ");
AllMethods.PrintNums(evenNums);

Console.Write("\nOdd numbers: ");
AllMethods.PrintNums(oddNums);

Console.Write($"\nSum: {sumNums}");

