using Lesson_9_10.Interfaces;

namespace Lesson_9_10.Implementations;

public class Division : ICalculatorOperation
{
    public double Execute(double a, double b)
    {
        try
        {
            if (b == 0)
            {
                throw new DivideByZeroException();
            }
            return a / b;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return 0;
        }
       
    }
    
    public string Name => "Division";
    public string OperationSymbol => "/";
}