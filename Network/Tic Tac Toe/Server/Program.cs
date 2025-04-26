using System.Net;
using System.Net.Sockets;
using System.Text;
using Tic_Tac_Toe;

Methods methods = new Methods();
TcpListener listener = new(IPAddress.Any, 3003);
listener.Start();

Console.WriteLine("Server started. Waiting for clients...");
char[,] board = new char[3, 3];
methods.BoardFill(board);

using TcpClient client = await listener.AcceptTcpClientAsync();
Console.WriteLine("Client connected.");

using NetworkStream stream = client.GetStream();
using var reader = new StreamReader(stream, Encoding.UTF8); // для чтения сообщения(координат, о выигрыше)
using var writer = new StreamWriter(stream, Encoding.UTF8) { AutoFlush = true };// для отправки(координат, сообщения)

while (true)
{
    Console.Clear();
    methods.PrintBoard(board);
    Console.WriteLine("Your turn(X). Enter row and col: ");
    
    string input = Console.ReadLine();
    if (string.IsNullOrWhiteSpace(input))
    {
        Console.WriteLine("No input");
        Thread.Sleep(500);
        continue;
    }
    
    var inputs = input.Split(' ');
    
    if (inputs.Length != 2 || !int.TryParse(inputs[0], out int row) || !int.TryParse(inputs[1], out int col))
    {
        Console.WriteLine("Invalid input");
        Thread.Sleep(500);
        continue;
    }

    if (row < 0 || row > 2 || col < 0 || col > 2)
    {
        Console.WriteLine("Invalid input");
        Thread.Sleep(500);
        continue;
    }

    if (board[row, col] == 'X' || board[row, col] == 'O')
    {
        Console.WriteLine("Invalid move");
        Thread.Sleep(500);
        continue;
    }

    methods.MakeMove(row, col, board, 'X');

    if (methods.WinCombinationCheck(board, 'X'))
    {
        Console.Clear();
        methods.PrintBoard(board);
        Console.WriteLine("You win");
        await writer.WriteLineAsync("player1");
        break;
    }
    if (methods.IsDraw(board))
    {
        Console.Clear();
        methods.PrintBoard(board);
        Console.WriteLine("Draw");
        await writer.WriteLineAsync("draw");
        break;
    }
    
    // так как коодинаты нужно пеердать в виде string, пришлось делать так
    await writer.WriteLineAsync($"{row},{col}");

    // сообщение клента - это либо коодинаты(clientCoords), либо сообщение о выигрыше("player2")
    string? cMessage = await reader.ReadLineAsync();
    if (cMessage == "player2")
    {
        Console.Clear();
        methods.PrintBoard(board);
        Console.WriteLine("Player 2 wins!");
        break;
    }
    if (cMessage == "draw")
    {
        Console.Clear();
        methods.PrintBoard(board);
        Console.WriteLine("Draw!");
        await writer.WriteLineAsync("draw");
        break;
    }

    var clientCoords = cMessage.Split(',');
    
    int cRow = int.Parse(clientCoords[0]);
    int cCol = int.Parse(clientCoords[1]);
    
    // То есть тут я беру координаты от клиента и делаю ход(все написанное аналогично и у клиента)
    methods.MakeMove(cRow, cCol, board, 'O');
}