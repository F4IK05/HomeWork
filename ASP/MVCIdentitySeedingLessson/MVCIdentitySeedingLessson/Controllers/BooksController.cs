using Microsoft.AspNetCore.Mvc;
using MVCIdentitySeedingLessson.Data;

namespace MVCIdentitySeedingLessson.Controllers;

public class BooksController : Controller
{
    private readonly ApplicationDbContext _context;

    public BooksController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var books = _context.Books.ToList();

        return View(books);
    }
}
