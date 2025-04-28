using System.Net;
using System.Net.Sockets;
using NetworkLesson3;

Methods methods = new Methods();
bool isRunning = true;

Console.Write("Введите порт для прослушивания: ");
if (!int.TryParse(Console.ReadLine(), out int port))
{
    Console.WriteLine("Неправильный формат порта.");
    return;
}

TcpListener listener = new TcpListener(IPAddress.Any, port);
listener.Start();

Console.WriteLine($"Север запущен на порту {port}.\nIp адрес сервера: {methods.GetLocalIpAddress()}");
Console.WriteLine("Ожидание подключения клиента...");

using TcpClient client = listener.AcceptTcpClient();

Console.WriteLine("\nКлиент подключился!");
Thread.Sleep(500);
Console.Clear();

using NetworkStream stream = client.GetStream();
StreamWriter writer = new StreamWriter(stream) { AutoFlush = true };
StreamReader reader = new StreamReader(stream);

Task.Run(() =>
{
    while (isRunning)
    {
        string cMessage = reader.ReadLine();
        if (cMessage == null)
        {
            Console.WriteLine("\nСоединение закрыто.");
            isRunning = false;
            break;
        }
        
        var (left, top) = Console.GetCursorPosition();
            
        Console.SetCursorPosition(0, top);
        Console.Write(new string(' ', Console.WindowWidth));
        Console.SetCursorPosition(0, top);
        
        Console.WriteLine($"Клиент: {cMessage}");
        
        Console.Write("Вы: ");
    }
});

Console.WriteLine("=====Чат=====");
while (isRunning)
{
    Console.Write("Вы: ");
    string message = Console.ReadLine();
    writer.WriteLine(message);
    
    if (message == "quit")
    {
        isRunning = false;
        break;
    }
}

listener.Stop();
client.Close();
stream.Close();
