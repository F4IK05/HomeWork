using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using AuthApi.Contracts.DTOs.Requests;
using AuthApi.Contracts.DTOs.Response;
using AuthApi.Data.Models;
using AutoMapper;

namespace AuthApi.Infrastructure.MappingConfigurations;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Маппинг для стандартной регистрации
        CreateMap<RegisterRequestDto, User>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => ValidateEmail(src.Email)))
            .ForMember(dest => dest.Password, opt => opt.MapFrom(src => ValidatePassword(src.Password, src.ConfirmPassword)))
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.UserRoles, opt => opt.Ignore());
        
        // Маппинг для Google-регистрации
        CreateMap<GoogleUserInfo, User>()
            .ForMember(dest => dest.UserName, opt => opt.Ignore())
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.GoogleId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.Picture))
            .ForMember(dest => dest.isConfirmed, opt => opt.MapFrom(src => src.VerifiedEmail))
            .ForMember(dest => dest.Password, opt => opt.Ignore()) // Пароль установим отдельно
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
            throw new ValidationException("Invalid password");
        }

        if (!Regex.IsMatch(password, passwordPattern))
        {
            throw new ValidationException("Invalid password");
        }
        
        return password;
    }
}