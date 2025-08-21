namespace UserService.API.DTOs.Response;

public class Result
{
    public string Message { get; }
    public bool IsSuccess { get; }
    public int StatusCode { get; }

    private Result(string message, bool isSuccess, int statusCode)
    {
        Message = message;
        IsSuccess = isSuccess;
        StatusCode = statusCode;
    }
    
    public static Result Success(string message = "Success", int statusCode = 200)
    {
        return new Result(message, true, statusCode);
    }

    public static Result Error(string message = "Error", int statusCode = 400)
    {
        return new Result(message, false, statusCode);
    }
}