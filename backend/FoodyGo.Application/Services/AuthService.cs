using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using FoodyGo.Core.Entities;
using FoodyGo.Core.Interfaces;
using FoodyGo.Core.Constants;
using Microsoft.Extensions.Configuration;

namespace FoodyGo.Application.Services;

public class AuthService : IAuthService
{
    private readonly IRepository<User> _userRepo;
    private readonly IConfiguration _config;

    public AuthService(IRepository<User> userRepo, IConfiguration config)
    {
        _userRepo = userRepo;
        _config = config;
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
    {
        var users = await _userRepo.FindAsync(u => u.Email == loginDto.Email);
        var user = users.FirstOrDefault();

        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            throw new Exception(Messages.Error.InvalidCredentials);

        return new AuthResponseDto { Token = GenerateJwtToken(user), User = MapToUserDto(user) };
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
    {
        var existing = await _userRepo.FindAsync(u => u.Email == registerDto.Email);
        if (existing.Any())
            throw new Exception(Messages.Error.EmailAlreadyRegistered);

        var user = new User
        {
            Name = registerDto.Name,
            Email = registerDto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
            AvatarUrl = "https://ui-avatars.com/api/?name=" + Uri.EscapeDataString(registerDto.Name) + "&background=random"
        };

        user.Addresses.Add(new UserAddress
        {
            Title = !string.IsNullOrWhiteSpace(registerDto.AddressTitle) ? registerDto.AddressTitle : Messages.Common.DefaultAddressTitle,
            City = registerDto.City,
            District = registerDto.District,
            AddressDetail = registerDto.AddressDetail,
            IsActive = true
        });

        await _userRepo.AddAsync(user);

        return new AuthResponseDto { Token = GenerateJwtToken(user), User = MapToUserDto(user) };
    }

    private static UserDto MapToUserDto(User user) => new()
    {
        Id = user.Id,
        Name = user.Name,
        Email = user.Email,
        AvatarUrl = user.AvatarUrl
    };

    private string GenerateJwtToken(User user)
    {
        var jwtKey = _config["Jwt:Key"]
            ?? throw new InvalidOperationException("Jwt:Key is not configured.");

        var key = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(jwtKey));
        var creds = new Microsoft.IdentityModel.Tokens.SigningCredentials(
            key, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new System.Security.Claims.Claim(
                System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new System.Security.Claims.Claim(
                System.Security.Claims.ClaimTypes.NameIdentifier, user.Id.ToString()),
            new System.Security.Claims.Claim(
                System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Email, user.Email),
            new System.Security.Claims.Claim("name", user.Name),
        };

        var token = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds);

        return new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler().WriteToken(token);
    }
}
