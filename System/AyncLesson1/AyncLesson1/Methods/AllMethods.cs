namespace AyncLesson1.Methods;

public class AllMethods
{
    public static void PrintNums(List<int> nums)
    {
        foreach (var num in nums)
        {
            Console.Write($"{num} ");
        }
    }

    public static async Task<List<int>> FilterEvenAsync(List<int> numbers)
    {
        return await Task.Run(async () =>
        {
            await Task.Delay(1500);
            return numbers.Where(num => num % 2 == 0).ToList();
        });
    }

    public static async Task<List<int>> FilterOddAsync(List<int> numbers)
    {
        return await Task.Run(async () =>
        {
            await Task.Delay(1500);
            return numbers.Where(num => num % 2 != 0).ToList();
        });
    }

    public static async Task<int> CalculateSumAsync(List<int> numbers)
    {
        return await Task.Run(async () =>
        {
            await Task.Delay(1000);
            return numbers.Sum();
        });
    }
}