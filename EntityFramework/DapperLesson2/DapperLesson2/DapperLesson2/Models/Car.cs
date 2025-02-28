namespace DapperLesson2;

public class Car
{
    public int Id { get; set; }
    public string Brand { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }
    public decimal Price { get; set; }
    
    public override string ToString()
    {
        return $"{Id} | {Brand} | {Model} | {Year} | {Price}";
    }
}