using Scalar.AspNetCore;

namespace MusicApi.Presentation.Extensions;

public static class ApplicationBuilderExtensions
{
    public static WebApplication UseApplicationMiddleware(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseHttpsRedirection();

        // CORS для фронта
        app.UseCors("AllowFront");

        // Если будет middleware для ошибок:
        // app.UseMiddleware<GlobalExceptionMiddleware>();

        // JWT авторизация (если используется)
        app.UseAuthentication();
        app.UseAuthorization();

        app.UseStaticFiles();

        app.MapControllers();
        app.MapScalarApiReference();

        return app;
    }
}