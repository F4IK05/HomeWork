using Lesson_9_10.Interfaces;

namespace Lesson_9_10.Implementations;

public class Subtraction : ICalculatorOperation
{
    public double Execute(double a, double b)
    {
        return a - b;
    }
    
    public string Name => "Subtraction";
    public string OperationSymbol => "-";
}