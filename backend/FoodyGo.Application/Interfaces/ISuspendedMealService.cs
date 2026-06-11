using FoodyGo.Application.DTOs;

namespace FoodyGo.Application.Interfaces;

public interface ISuspendedMealService
{
    Task<IEnumerable<SuspendedMealResponseDto>> GetAvailableSuspendedMealsAsync();
    Task<bool> ClaimSuspendedMealAsync(Guid id, Guid userId);
}
