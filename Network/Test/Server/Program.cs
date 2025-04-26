using System.Net;
using System.Net.Sockets;
using System.Text;

TcpListener listener = new(IPAddress.Any, 3003);
listener.Start();

Console.WriteLine("Server started. Waiting for a connection...");

while (true)
{
    var client = await listener.AcceptTcpClientAsync();
    Console.WriteLine("Client connected.");

    _ = Task.Run(async () =>
    {
        using NetworkStream stream = client.GetStream();
        using var reader = new StreamReader(stream, Encoding.UTF8);

        string? message;
        while ((message = await reader.ReadLineAsync()) != null)
        {
            Console.WriteLine($"Received: {message}");

            if (message.ToLower() == "quit")
                break;
        }

        client.Close();
        Console.WriteLine("Client disconnected.");
    });
}