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
    private readonly IRepository<User> _userRepository;

    public UserService(IRepository<Order> orderRepository, IRepository<User> userRepository)
    {
        _orderRepository = orderRepository;
        _userRepository = userRepository;
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

                if (item.Box != null)
                {
                    moneySaved += (item.Box.OriginalPrice - item.Box.DiscountedPrice) * item.Quantity;
                }
            }
        }

        double co2Saved = (totalRescued + totalSuspended) * 2.5;

        return new UserStatsDto
        {
            TotalRescuedMeals = totalRescued,
            TotalSuspendedMeals = totalSuspended,
            TotalCO2SavedKg = co2Saved,
            TotalMoneySaved = moneySaved
        };
    }

    public async Task<UserDto> UpdateUserAsync(Guid userId, UpdateProfileDto dto)
    {
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            throw new Exception("User not found.");
        }

        user.Name = dto.Name;
        user.Email = dto.Email;

        if (!string.IsNullOrEmpty(dto.Password))
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        }

        await _userRepository.UpdateAsync(user);

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Avatar = user.Avatar,
            WalletBalance = user.WalletBalance
        };
    }
}
