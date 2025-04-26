namespace Tic_Tac_Toe;

public class Methods
{
    public void BoardFill(char[,] board)
    {
        for (int row = 0; row < 3; row++)
        {
            for (int col = 0; col < 3; col++)
            {
                board[row, col] = ' ';
            }
        }
    }

    public void PrintBoard(char[,] board)
    {
        Console.WriteLine();
        for (int row = 0; row < 3; row++)
        {
            for (int col = 0; col < 3; col++)
            {
                Console.Write($" {board[row, col]} ");
                if (col < 2) Console.Write("|");
            }

            Console.WriteLine();
            if (row < 2) Console.WriteLine("---+---+---");
        }
    }

    public void MakeMove(int row, int col,char[,] board, char symbol)
    {
        if (board[row, col] == ' ') board[row, col] = symbol;
    }

    public bool WinCombinationCheck(char[,] board, char symbol)
    {
        for (int i = 0; i < 3; i++)
        {
            if ((board[0, i] == symbol && board[1, i] == symbol && board[2, i] == symbol)
                || (board[i, 0] == symbol && board[i, 1] == symbol && board[i, 2] == symbol))
            {
                return true;
            }
        }

        if ((board[0, 0] == symbol && board[1, 1] == symbol && board[2, 2] == symbol)
            || (board[0, 2] == symbol && board[1, 1] == symbol && board[2, 0] == symbol))
        {
            return true;
        }
        
        return false;
    }

    public bool IsDraw(char[,] board)
    {
        foreach (var cell in board)
        {
            if (cell == ' ') return false;
        }
        return true;
    }
}