using System.Xml.Linq;
using Lesson11.Data.Model;

namespace Lesson11.Interfaces;

public interface IFileService
{
    public void Save(Results results);
    public void DeleteMovie(string movieName);
}