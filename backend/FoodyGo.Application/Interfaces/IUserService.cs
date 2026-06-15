using FoodyGo.Application.DTOs;

namespace FoodyGo.Application.Interfaces;

public interface IUserService
{
    Task<UserStatsDto> GetUserStatsAsync(Guid userId);
    Task<UserDto> UpdateUserAsync(Guid userId, UpdateProfileDto dto);
}
