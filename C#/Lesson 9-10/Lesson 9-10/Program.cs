using Lesson_9_10.Implementations;
using Lesson_9_10.Interfaces;

class Program
{
    static void Main(string[] args)
    {
        

        ICalculatorOperation[] operations = new ICalculatorOperation[]
        {
            new Addition(),
            new Subtraction(),
            new Multiplication(),
            new Division()
        };
        
        

        while (true)
        {   
            Console.Write("Choose operation: ");
            for (int i = 0; i < operations.Length; i++)
            {
                Console.Write($"\n{i + 1}. {operations[i].Name}");
            }
            
            Console.Write("\n0. Exit\nChoice: ");
            if (!int.TryParse(Console.ReadLine(), out int choice) || choice < 0 || choice > operations.Length)
            {
                Console.WriteLine("\nInvalid choice.\n");
                continue;
            }

            if (choice == 0)
            {
                Console.WriteLine("Bye");
                break;
            }

            double a = 0, b = 0;
            bool firstNumber = false;
            bool secondNumber = false;
            
            Console.Write("Enter first number: ");
            try
            {
                a = double.Parse(Console.ReadLine());
                firstNumber = true;
                        
            }
            catch (FormatException e)
            {
                Console.WriteLine(e.Message);
            }
            
            if (firstNumber)
            {
                Console.Write("Enter second number: ");
                try
                {
                    b = double.Parse(Console.ReadLine());
                    secondNumber = true;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                } 
            }
            
            if (firstNumber && secondNumber)
            {
                
                double result = operations[choice - 1].Execute(a, b);

                if (b == 0 && operations[choice - 1] is Division)
                {
                    continue;
                }

                Console.WriteLine($"\n{a} {operations[choice - 1].OperationSymbol} {b} = {result}\n");
                
            }
        }
    }
}