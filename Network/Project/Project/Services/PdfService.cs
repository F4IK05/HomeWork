using Project.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;


namespace Project.Services;
public class PdfService
{
    
    public List<string> GenerateFavoriteMoviesPdf(List<Movie> movies, string userName)
    {
        var resultFiles = new List<string>();
        
        var groups = movies
            .Select((movie, index) => new { movie, index })
            .GroupBy(x => x.index / 5)
            .Select(g => g.Select(x => x.movie).ToList())
            .ToList();

        int pageCount = 1;
        foreach (var group in groups) // для кажлой группы из 5 создается файл.
        {
            var filePath = Path.Combine("TempFiles", $"{userName}_page{pageCount}.pdf");
            Directory.CreateDirectory("TempFiles");

            Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(30);

                    page.Header().Text($"Page {pageCount}")
                        .SemiBold().FontSize(18).FontColor(Colors.Blue.Medium);

                    page.Content().Column(col =>
                    {
                        foreach (var movie in group)
                        {
                            col.Item().PaddingBottom(5).Text($"{movie.Title} ({movie.Year})")
                                .FontSize(20);
                        }
                    });
                });
            }).GeneratePdf(filePath);

            resultFiles.Add(filePath);
            pageCount++;
        }

        return resultFiles;
    }
}