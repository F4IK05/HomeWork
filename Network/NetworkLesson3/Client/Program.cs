using System.Net.Sockets;

bool isRunning = true;

Console.Write("Введите IpAddress другого пользователя(сервера): ");
string? ipAddress = Console.ReadLine();

Console.Write("Введите Port другого пользователя(сервера): ");
if (!int.TryParse(Console.ReadLine(), out int port))
{
    Console.WriteLine("Неправильный формат порта.");
    return;
}

try
{
    using TcpClient client = new TcpClient();
    if (ipAddress != null) client.Connect(ipAddress, port);

    Console.WriteLine("\nПодключение к серверу установлено!");
    Thread.Sleep(500);
    Console.Clear();
    
    using NetworkStream stream = client.GetStream();
    StreamWriter writer = new StreamWriter(stream) { AutoFlush = true };
    StreamReader reader = new StreamReader(stream);

    Task.Run(() =>
    {
        while (isRunning)
        {
            string? sMessage = reader.ReadLine();
            if (sMessage == null)
            {
                Console.WriteLine("\nСоединение закрыто.");
                isRunning = false;
                break;
            }
            
            var (left, top) = Console.GetCursorPosition();
            
            Console.SetCursorPosition(0, top);
            Console.Write(new string(' ', Console.WindowWidth));
            Console.SetCursorPosition(0, top);
            
            Console.WriteLine($"Сервер: {sMessage}");
            
            Console.Write("Вы: ");
        }
    });

    Console.WriteLine("=====Чат=====");
    while (isRunning)
    {
        Console.Write("Вы: ");
        string? message = Console.ReadLine();
        writer.WriteLine(message);

        if (message?.ToLower() == "quit")
        {
            isRunning = false;
            break;
        }
    }
    
    client.Close();
    stream.Close();
}
catch (Exception e)
{
    Console.WriteLine("Проверьте правильность IP адреса и порта.");
}