using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using FoodyGo.Core.Entities;
using FoodyGo.Core.Interfaces;
using FoodyGo.Core.Constants;
using Microsoft.EntityFrameworkCore;

namespace FoodyGo.Application.Services;

public class SuspendedMealService : ISuspendedMealService
{
    private readonly IRepository<SuspendedMeal> _suspendedMealRepository;

    public SuspendedMealService(IRepository<SuspendedMeal> suspendedMealRepository)
    {
        _suspendedMealRepository = suspendedMealRepository;
    }

    public async Task<IEnumerable<SuspendedMealResponseDto>> GetAvailableSuspendedMealsAsync()
    {
        var meals = await _suspendedMealRepository.FindAsync(
            sm => !sm.IsClaimed,
            query => query.Include(sm => sm.Restaurant).Include(sm => sm.Box).Include(sm => sm.DonorUser)
        );

        return meals.Select(sm => new SuspendedMealResponseDto
        {
            Id = sm.Id,
            RestaurantId = sm.RestaurantId,
            RestaurantName = sm.Restaurant?.Name ?? Messages.Common.Empty,
            RestaurantImageUrl = sm.Restaurant?.ImageUrl ?? Messages.Common.Empty,
            BoxId = sm.BoxId,
            BoxName = sm.Box?.Name ?? Messages.Common.Empty,
            DonorName = sm.DonorUser?.Name ?? Messages.Common.AnonymousUser,
            CreatedAt = sm.CreatedAt
        }).OrderByDescending(sm => sm.CreatedAt);
    }

    public async Task<bool> ClaimSuspendedMealAsync(Guid id, Guid userId)
    {
        var meal = await _suspendedMealRepository.GetByIdAsync(id);
        
        if (meal == null || meal.IsClaimed)
        {
            return false;
        }

        meal.IsClaimed = true;
        meal.ClaimedByUserId = userId;

        await _suspendedMealRepository.UpdateAsync(meal);

        return true;
    }
}
