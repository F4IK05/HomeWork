using System.Net;
using System.Net.Sockets;

namespace NetworkLesson3;

public class Methods
{
    public string GetLocalIpAddress()
    {
        string hostName = Dns.GetHostName();
        string ipAddress = Dns.GetHostEntry(hostName)
            .AddressList
            .First(a => a.AddressFamily == AddressFamily.InterNetwork)
            .ToString();
        
        return ipAddress;
    }
}