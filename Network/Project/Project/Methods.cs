using Project.Services;

namespace Project;

public class Methods
{
    public void Register()
    {
        var authService = new AuthService();
        
        Console.Write("Username: ");
        string username = Console.ReadLine();
        
        Console.Write("Email: ");
        string email = Console.ReadLine();

        if (!authService.IsValidEmail(email))
        {
            Console.WriteLine("Invalid email");
            return;
        }

        Console.Write("Password: ");
        string password = Console.ReadLine();

        if (authService.Register(username, email, password))
        {
            Console.WriteLine("Congratulations! Your account has been successfully registered! Please, login now.");
        }
        else Console.WriteLine("User already exists.");
    }

    public void Login()
    {
        var movieService = new MovieService();
        var authService = new AuthService();
        var favoriteService = new FavoriteService();
        var emailService = new EmailService();
        
        Console.Write("Username: ");
        string username = Console.ReadLine();
        
        Console.Write("Password: ");
        string password = Console.ReadLine();

        if (authService.Login(username, password))
        {
            Console.WriteLine("This is an User Account.");

            while (true)
            {
                Console.WriteLine("Options:\n1. Search movie\n2. Show my favorite\n3. Exit");
                
                string option = Console.ReadLine();

                switch (option)
                {
                    case "1":
                        Console.Write("Name: ");
                        string title = Console.ReadLine();

                        var movies = movieService.GetMovie(title);

                        for (int i = 0; i < movies.Count; i++)
                        {
                            Console.WriteLine($"{i + 1}. {movies[i].Title} ({movies[i].Year})");
                        }

                        Console.Write("Select a movie number to add to favorites: ");
                        int index = int.Parse(Console.ReadLine());
                        
                        var selectedMovie = movies[index - 1];
                        
                        favoriteService.AddMovieToFavorites(authService.GetUserByName(username), selectedMovie);

                        Console.WriteLine("Movie added to favorites.");
                        break;
                    case "2":
                        emailService.Export(authService.GetUserByName(username));
                        break;
                }
            }
        }
        else Console.WriteLine("Something went wrong. Try again.");
    }
}