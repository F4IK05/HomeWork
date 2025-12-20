using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace domain_1.Models;

public class Item
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("price")]
    public decimal Price { get; set; }
}