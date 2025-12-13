using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace MusicApi.Infrastructure.Repositories.Services.Classes;

public class S3Service
{
    private readonly IAmazonS3 _s3Client;
    private readonly string _bucketName;
    private readonly string _cloudFrontDomain;

    public S3Service(IAmazonS3 s3Client, IConfiguration config)
    {
        _s3Client = s3Client;
        _bucketName = Environment.GetEnvironmentVariable("AWS_S3_BUCKET_NAME");
        _cloudFrontDomain = Environment.GetEnvironmentVariable("AWS_S3_CLOUD_FRONT_DOMAIN");
    }

    public async Task<string> UploadFileAsync(IFormFile file, string folder)
    {
        var fileKey = $"{folder}/{Guid.NewGuid()}_{file.FileName}";

        using var stream = file.OpenReadStream();
        var uploadRequest = new TransferUtilityUploadRequest
        {
            InputStream = stream,
            Key = fileKey,
            BucketName = _bucketName,
            ContentType = file.ContentType
        };

        var transferUtility = new TransferUtility(_s3Client);
        await transferUtility.UploadAsync(uploadRequest);

        return $"https://{_cloudFrontDomain}/{fileKey}";
    }

    // удаление объекта по CloudFront URL
    public async Task DeleteFileAsync(string fileUrl)
    {
        if (string.IsNullOrEmpty(fileUrl)) return;

        try
        {
            var uri = new Uri(fileUrl);

            var key = Uri.UnescapeDataString(uri.AbsolutePath.TrimStart('/'))
                .Replace("\\", "/");

            if (key.StartsWith("/"))
                key = key[1..];

            Console.WriteLine($"Deleting S3 object: {key}");

            var deleteRequest = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = key
            };

            await _s3Client.DeleteObjectAsync(deleteRequest);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to delete S3 file: {fileUrl}\nError: {ex.Message}");
        }
    }
}