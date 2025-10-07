using AuthApi.Infrastructure.Middlewares;
using Scalar.AspNetCore;

namespace AuthApi.Presentation.Extensions;

public static class ApplicationBuilderExtensions
{
    public static WebApplication UseApplicationMiddleware(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseHttpsRedirection();

        app.UseCors("AllowFront"); // разрешение фронта на общение с API(CORS)
        
        app.UseMiddleware<GlobalExceptionMiddleware>();
        
        // именно в таком порядке
        app.UseAuthentication(); // Сначала проверка токена  
        app.UseAuthorization(); // Потом проверка доступа

        app.UseStaticFiles();

        app.MapControllers();
        app.MapScalarApiReference();
        
        return app;
    }
}