using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using FoodyGo.Core.Entities;
using FoodyGo.Core.Enums;
using FoodyGo.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FoodyGo.Application.Services;

public class UserService : IUserService
{
    private readonly IRepository<Order> _orderRepository;

    public UserService(IRepository<Order> orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<UserStatsDto> GetUserStatsAsync(Guid userId)
    {
        var completedOrders = await _orderRepository.FindAsync(
            o => o.UserId == userId && o.Status == OrderStatus.Completed,
            query => query.Include(o => o.Items).ThenInclude(i => i.Box)
        );

        int totalRescued = 0;
        int totalSuspended = 0;
        decimal moneySaved = 0;

        foreach (var order in completedOrders)
        {
            foreach (var item in order.Items)
            {
                if (item.IsSuspended)
                {
                    totalSuspended += item.Quantity;
                }
                else
                {
                    totalRescued += item.Quantity;
                }

                // Money saved from all items
                if (item.Box != null)
                {
                    moneySaved += (item.Box.OriginalPrice - item.Box.DiscountedPrice) * item.Quantity;
                }
            }
        }

        // Assume ~2.5kg CO2 saved per rescued box.
        // We only count standard boxes for CO2 savings for the user. (or count all? let's count all boxes purchased)
        double co2Saved = (totalRescued + totalSuspended) * 2.5;

        return new UserStatsDto
        {
            TotalRescuedMeals = totalRescued,
            TotalSuspendedMeals = totalSuspended,
            TotalCO2SavedKg = co2Saved,
            TotalMoneySaved = moneySaved
        };
    }
}
