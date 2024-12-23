using Lesson_9_10.Interfaces;

namespace Lesson_9_10.Implementations;

public class Addition : ICalculatorOperation
{
    public double Execute(double a, double b)
    {
        return a + b;
    }
    
    public string Name => "Addition";
    public string OperationSymbol => "+";
}