using System.Net;
using System.Net.Sockets;
using System.Text;

var serverSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);

var address = IPAddress.Parse("127.0.0.1");
var serverEndPoint = new IPEndPoint(address, 3003);

var buffer = new byte[1024];

try
{
    serverSocket.Bind(serverEndPoint);

    serverSocket.Listen();
    Console.WriteLine($"Listening on {serverEndPoint.Address}:{serverEndPoint.Port}");

    while (true)
    {
        var clientSocket = serverSocket.Accept();
        Console.WriteLine($"Client connected: {clientSocket.RemoteEndPoint}");

        while (true)
        {
            var bytesRead = clientSocket.Receive(buffer);
            var message = Encoding.UTF8.GetString(buffer, 0, bytesRead);
            Console.WriteLine($"Received: {message}");

            if (message.ToLower() == "quit")
            {
                clientSocket.Shutdown(SocketShutdown.Both);
                clientSocket.Close();
                break;
            }

            Console.WriteLine("Enter message to client:");
            string answer = Console.ReadLine();
            
            byte[] messageBytes = Encoding.ASCII.GetBytes(answer);
            clientSocket.Send(messageBytes);
            Console.WriteLine($"Sent: {answer}");
        }
    }
}
catch (Exception e)
{
    Console.WriteLine(e);
    throw;
}