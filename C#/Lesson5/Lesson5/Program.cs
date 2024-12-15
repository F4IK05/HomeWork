namespace MyClass;

class Book
{
    public string Title { get; set; }
    public string Author { get; set; }
    public int Year { get; set; }

    public Book(string title, string author, int year)
    {
        Title = title;
        Author = author;
        Year = year;
    }
}

class Manager {
    private List<Book> books = new List<Book>();
    public int count = 0;
    
    public void AddBook(Book book)
    {
        bool exist = false;
        for (int i = 0; i < books.Count; i++)
        {
            if (books[i].Title == book.Title)
            {
                Console.WriteLine("This book is already in the list", book.Title);
                exist = true;
                
            }
        }

        if (!exist)
        {
            books.Add(book);
            count++;
            Console.WriteLine("Book added");
        }
    }

    public void RemoveBook(int id)
    {
        if (id >= 1 && id <= books.Count)
        {
            books.RemoveAt(id - 1);
            count--;
        }
    }

    public void DisplayAllBooks()
    {
        if (count > 0)
        {
            Console.WriteLine("-------------------------------------------");
            for (int i = 0; i < count; i++)
            {
                Console.WriteLine($"{i + 1}. \"{books[i].Title}\" - {books[i].Author} ({books[i].Year})");
                    
            }
            Console.WriteLine("-------------------------------------------");
                
                
        }
        else
        {
            Console.WriteLine("There is no books in the library");
        }
    }
}


class Program
{
    static void Main(string[] args)
    {
        Manager manager = new Manager();
        bool isFinished = false;
        Console.WriteLine("Welcome to the library!");
        while (!isFinished)
        {
            
            Console.WriteLine("Choose an option:\n1. Add book\n2. Remove book\n3. Display all books\n4. Exit");
            string? input = Console.ReadLine();
            switch (input)
            {
                case "1":
                    Console.Write("Enter title: ");
                    string? title = Console.ReadLine();
                    if (title.Length != 0)
                    {
                        Console.Write("Enter author: ");
                        string? author = Console.ReadLine();
                        if (author.Length != 0 && !author.Any(char.IsDigit))
                        {
                            Console.Write("Enter year: ");
                            if (int.TryParse(Console.ReadLine(), out int year) && year.ToString().Length >= 4 && year >= 1455 && year <= DateTime.Now.Year)
                            {
                                manager.AddBook(new Book(title, author, year));
                        
                            }
                            else
                            {
                                Console.WriteLine("Year format: 1455 - present year");
                            }
                        }
                        else
                        {
                            Console.WriteLine("Author is required!\nAu");
                        }
                    }
                    else
                    {
                        Console.WriteLine("Name is required!");
                    }
                    break;
                case "2":
                    Console.Write("Enter id to remove: ");
                    if (int.TryParse(Console.ReadLine(), out int id))
                    {
                        if (id > 0 && id <= manager.count)
                        {
                            manager.RemoveBook(id);
                            Console.WriteLine("Book removed");
                        }
                        else
                        {
                            Console.WriteLine("Error!");
                        }
                    }
                    break;
                case "3":
                    manager.DisplayAllBooks();
                    break;
                case "4":
                    Console.WriteLine("Bye!");
                    isFinished = true;
                    break;
            }
        }
    }
}