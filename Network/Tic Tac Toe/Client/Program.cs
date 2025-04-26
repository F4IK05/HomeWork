using System.Net.Sockets;
using System.Text;
using Tic_Tac_Toe;

Methods methods = new Methods();
TcpClient client = new TcpClient();
await client.ConnectAsync("127.0.0.1", 3003);

using NetworkStream stream = client.GetStream();
using var reader = new StreamReader(stream, Encoding.UTF8);
using var writer = new StreamWriter(stream, Encoding.UTF8) { AutoFlush = true };

char[,] board = new char[3, 3];
methods.BoardFill(board);
while (true)
{
    string? sMessage = await reader.ReadLineAsync();
    if (sMessage == "player1")
    {
        Console.Clear();
        methods.BoardFill(board);
        Console.WriteLine("Player 1 wins!");
        break;
    }
    if (sMessage == "draw")
    {
        Console.Clear();
        methods.BoardFill(board);
        Console.WriteLine("Draw!");
        break;
    }

    var serverCoords = sMessage.Split(',');
    int sRow = int.Parse(serverCoords[0]);
    int sCol = int.Parse(serverCoords[1]);
    
    methods.MakeMove(sRow, sCol, board, 'X');

    // сделано здесь так(если сравнивать с Server) потому что, на момент работы Client, row и col уже существуют
    // и даже при неуданом 'парсинге'(54 строка) в MakeMove что-то передается
    int row, col;
    while (true)
    {
        Console.Clear();
        methods.PrintBoard(board);
        Console.WriteLine("Your turn(O). Enter row and col: ");
        
        string input = Console.ReadLine();
        if (string.IsNullOrWhiteSpace(input))
        {
            Console.WriteLine("No input");
            Thread.Sleep(500);
            continue;
        }
    
        var inputs = input.Split(' ');
    
        if (inputs.Length != 2 || !int.TryParse(inputs[0], out row) || !int.TryParse(inputs[1], out col))
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
        break;
    }
    
    
    methods.MakeMove(row, col, board, 'O');

    if (methods.WinCombinationCheck(board, 'O'))
    {
        Console.Clear();
        methods.BoardFill(board);
        Console.WriteLine("You win!");
        await writer.WriteLineAsync("player2");
        break;
    }
    if (methods.IsDraw(board))
    {
        Console.Clear();
        methods.BoardFill(board);
        Console.WriteLine("Draw!");
        await writer.WriteLineAsync("draw");
        break;
    }
    
    await writer.WriteLineAsync($"{row},{col}");
}