namespace Lesson_9_10.Interfaces;

public interface ICalculatorOperation
{
    double Execute(double a, double b);
    string Name { get; }
    string OperationSymbol { get; }
}