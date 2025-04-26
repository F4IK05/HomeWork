using System.Net;
using System.Net.Sockets;
using System.Text;

try
{
    using var client = new TcpClient();
    await client.ConnectAsync("127.0.0.1", 3003);

    using var networkStream = client.GetStream();
    using var writer = new StreamWriter(networkStream, Encoding.UTF8) { AutoFlush = true };

    while (true)
    {
        Console.WriteLine("Enter message to send to server or type 'quit' to exit:");
        string? message = Console.ReadLine();

        if (message == null)
            continue;

        await writer.WriteLineAsync(message); // <--- добавлен await

        if (message.ToLower() == "quit")
            break;
    }
}
catch (Exception e)
{
    Console.WriteLine($"Client error: {e.Message}");
}