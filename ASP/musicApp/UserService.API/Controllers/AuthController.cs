using Microsoft.AspNetCore.Authorization;
   using Microsoft.AspNetCore.Mvc;
   using Microsoft.EntityFrameworkCore;
   using UserService.API.DTOs.GoogleAuthDTOs;
   using UserService.API.DTOs.Requests;
   using UserService.API.Services.Interfaces;
   using UserService.Data.Data.Contexts;

   namespace UserService.API.Controllers;
   
   [ApiController]
   [Route("api/[controller]")]
   public class AuthController : ControllerBase
   { 
       private readonly UserDbContext _context;
       private readonly IAuthService _authService;
       private readonly IGoogleAuthService _googleAuthService;
       private readonly ITokenService _tokenService;
   
       public AuthController(IAuthService authService, IGoogleAuthService googleAuthService, UserDbContext context, ITokenService tokenService)
       {
           _authService = authService;
           _googleAuthService = googleAuthService;
           _context = context;
           _tokenService = tokenService;
       }
   
       [HttpPost("Login")]
       public async Task<IActionResult> LoginAsync(LoginRequestDTO request)
       {
           return Ok(await _authService.LoginAsync(request));
       }

       [HttpGet("google/login")]
       public async Task<IActionResult> GoogleLoginAsync()
       {
           var url = _googleAuthService.GenerateGoogleAuthUrl("http://localhost:5173/auth/google");
   
           return Redirect(url);
       }
       
       [HttpPost("google/callback")]
       public async Task<IActionResult> GoogleCallback([FromQuery] string code)
       {
           Console.WriteLine($"Code received: {code}");
           
           try
           {
               // Обмен кода на токены
               var tokens = await _googleAuthService.ExchangeCodeOnTokenAsync(code, "http://localhost:5173/auth/google");
        
               // Получение данных пользователя
               var userInfo = await _googleAuthService.GetUserInfoAsync(tokens.AccessToken);
        
               // Проверка, есть ли пользователь в базе
               var user = await _context.Users.FirstOrDefaultAsync(u => u.GoogleId == userInfo.Id);

               if (user == null)
               {
                   user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userInfo.Email);

                   if (user != null)
                   {
                       user.GoogleId = userInfo.Id;
                       _context.Users.Update(user);
                       await _context.SaveChangesAsync();
                   }
               }

               if (user != null)
               {
                   var userRoles = await _context.UserRoles
                       .Where(ur => ur.UserId == user.Id)
                       .Include(ur => ur.Role)
                       .Select(ur => ur.Role.Name)
                       .ToListAsync();
            
                   var accessToken = await _tokenService.CreateTokenAsync(user, userRoles);
            
                   return Ok(new
                   {
                       success = true,
                       isNewUser = false,
                       data = new
                       {
                           AccessToken = accessToken,
                           Email = user.Email,
                           UserName = user.UserName,
                           Picture = user.AvatarUrl,
                       }
                   });
               }
               else
               {
                   return Ok(new
                   {
                       success = true,
                       isNewUser = true,
                       data = new
                       {
                           Email = userInfo.Email,
                           SuggestedUserName = userInfo.Name,
                           GoogleId = userInfo.Id,
                           Name = userInfo.Name,
                           Picture = userInfo.Picture
                       }
                   });
               }
           }
           catch (Exception ex)
           {
               return BadRequest(new { success = false, error = ex.Message });
           }
       }
   }