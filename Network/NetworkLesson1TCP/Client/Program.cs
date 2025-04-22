using System.Net;
using System.Net.Sockets;
using System.Text;

var clientSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);

var address = IPAddress.Parse("127.0.0.1");
var serverEndPoint = new IPEndPoint(address, 3003);

var buffer = new byte[1024];

try
{
    clientSocket.Connect(serverEndPoint);

    while (true)
    {
        Console.WriteLine("Enter message to send to server:");
        string message = Console.ReadLine();
        
        byte[] messageBytes = Encoding.UTF8.GetBytes(message);
        clientSocket.Send(messageBytes);
        Console.WriteLine($"Sent: {message}");

        if (message.ToLower() == "quit")
        {
            clientSocket.Shutdown(SocketShutdown.Both);
            clientSocket.Close();
            break;
        }
        
        var bytesReceived = clientSocket.Receive(buffer);
        var messageReceived = Encoding.UTF8.GetString(buffer, 0, bytesReceived);
        Console.WriteLine($"Received: {messageReceived}");
    }
}
catch (Exception e)
{
    Console.WriteLine(e);
    throw;
}