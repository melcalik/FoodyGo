using FoodyGo.Application.DTOs;

namespace FoodyGo.Application.Interfaces;

public interface IUserService
{
    Task<UserStatsDto> GetUserStatsAsync(Guid userId);
}
