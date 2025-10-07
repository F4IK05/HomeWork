using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using AuthApi.Contracts.DTOs.Requests.Auth;
using AuthApi.Data.Models;

namespace AuthApi.Infrastructure.MappingConfigurations;
using AutoMapper;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Регистрация через Email + Password
        CreateMap<RegisterRequestDto, User>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => ValidateEmail(src.Email)))
            .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => ValidatePassword(src.Password, src.ConfirmPassword)))
            .ForMember(dest => dest.AvatarUrl, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
            .ForMember(dest => dest.IsConfirmed, opt => opt.MapFrom(_ => false))
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.UserRoles, opt => opt.Ignore());
        
        // Регистрация через Google
        CreateMap<GoogleRegisterRequestDto, User>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.AvatarUrl))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
            .ForMember(dest => dest.IsConfirmed, opt => opt.MapFrom(_ => true))
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.UserRoles, opt => opt.Ignore());
    }
    
    private static string ValidateEmail(string email)
    {
        var emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

        if (!Regex.IsMatch(email, emailPattern))
        {
            throw new ValidationException("Invalid email address");
        }
        
        return email;
    }

    private static string ValidatePassword(string password, string confirmPassword)
    {
        var passwordPattern = @"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";

        if (password != confirmPassword)
        {
            throw new ValidationException("Password and confirm password do not match");
        }

        if (!Regex.IsMatch(password, passwordPattern))
        {
            throw new ValidationException("Invalid password");
        }
        
        return password;
    }
}