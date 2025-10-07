using System.ComponentModel.DataAnnotations;
using AuthApi.Contracts.DTOs.Response;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace AuthApi.Infrastructure.Middlewares;

public class GlobalExceptionMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }
    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        TypedResult<string> errorRes;

        switch (exception)
        {
            case AutoMapperMappingException mapEx:
                if (mapEx.InnerException is ValidationException innerValidationEx)
                {
                    errorRes = TypedResult<string>.Error(innerValidationEx.Message);
                }
                else
                {
                    errorRes = TypedResult<string>.Error("Mapping error: check DTO and AutoMapper config.");
                }
                break;

            default:
                errorRes = TypedResult<string>.Error(exception.Message);
                break;
        }

        var result = JsonConvert.SerializeObject(errorRes);
        await context.Response.WriteAsync(result);
    }
}