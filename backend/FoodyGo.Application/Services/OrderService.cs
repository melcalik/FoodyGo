using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using FoodyGo.Core.Entities;
using FoodyGo.Core.Enums;
using FoodyGo.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FoodyGo.Application.Services;

public class OrderService : IOrderService
{
    private readonly IRepository<Order> _orderRepository;
    private readonly IRepository<Box> _boxRepository;
    private readonly IRepository<Restaurant> _restaurantRepository;
    private readonly IRepository<SuspendedMeal> _suspendedMealRepository;

    public OrderService(
        IRepository<Order> orderRepository,
        IRepository<Box> boxRepository,
        IRepository<Restaurant> restaurantRepository,
        IRepository<SuspendedMeal> suspendedMealRepository)
    {
        _orderRepository = orderRepository;
        _boxRepository = boxRepository;
        _restaurantRepository = restaurantRepository;
        _suspendedMealRepository = suspendedMealRepository;
    }

    public async Task<OrderResponseDto> CreateOrderAsync(Guid userId, CreateOrderDto createOrderDto)
    {
        if (!createOrderDto.Items.Any())
            throw new ArgumentException("Order must contain at least one item.");

        var restaurant = await _restaurantRepository.GetByIdAsync(createOrderDto.RestaurantId);
        if (restaurant == null) throw new Exception("Restaurant not found.");

        var order = new Order
        {
            UserId = userId,
            RestaurantId = createOrderDto.RestaurantId,
            Type = createOrderDto.Type,
            Status = OrderStatus.Confirmed,
            TotalAmount = 0
        };

        await _orderRepository.ExecuteInTransactionAsync(async () =>
        {
            foreach (var itemDto in createOrderDto.Items)
            {
                var box = await _boxRepository.GetByIdAsync(itemDto.BoxId);
                if (box == null) throw new Exception($"Box with ID {itemDto.BoxId} not found.");
                
                if (!itemDto.ClaimingSuspendedMealId.HasValue)
                {
                    if (box.Stock < itemDto.Quantity)
                    {
                        throw new Exception($"Not enough stock for box {box.Name}. Available: {box.Stock}");
                    }

                    box.Stock -= itemDto.Quantity;
                    await _boxRepository.UpdateAsync(box);
                }

                var orderItem = new OrderItem
                {
                    BoxId = box.Id,
                    Quantity = itemDto.Quantity,
                    UnitPrice = itemDto.ClaimingSuspendedMealId.HasValue ? 0 : box.DiscountedPrice,
                    IsSuspended = itemDto.IsSuspended
                };

                order.Items.Add(orderItem);
                order.TotalAmount += orderItem.UnitPrice * orderItem.Quantity;

                if (itemDto.IsSuspended)
                {
                    for (int i = 0; i < itemDto.Quantity; i++)
                    {
                        var suspendedMeal = new SuspendedMeal
                        {
                            DonorUserId = userId,
                            RestaurantId = createOrderDto.RestaurantId,
                            BoxId = box.Id,
                            IsClaimed = false
                        };
                        await _suspendedMealRepository.AddAsync(suspendedMeal);
                    }
                }

                if (itemDto.ClaimingSuspendedMealId.HasValue)
                {
                    var mealToClaim = await _suspendedMealRepository.GetByIdAsync(itemDto.ClaimingSuspendedMealId.Value);
                    if (mealToClaim == null || mealToClaim.IsClaimed)
                    {
                        throw new Exception("Suspended meal is no longer available.");
                    }
                    mealToClaim.IsClaimed = true;
                    mealToClaim.ClaimedByUserId = userId;
                    await _suspendedMealRepository.UpdateAsync(mealToClaim);
                }
            }

            await _orderRepository.AddAsync(order);
        });

        return MapToDto(order, restaurant);
    }

    public async Task<IEnumerable<OrderResponseDto>> GetOrdersByUserIdAsync(Guid userId)
    {
        var orders = await _orderRepository.FindAsync(
            o => o.UserId == userId,
            query => query.Include(o => o.Restaurant).Include(o => o.Items).ThenInclude(i => i.Box)
        );

        return orders.Select(o => MapToDto(o, o.Restaurant)).OrderByDescending(o => o.CreatedAt);
    }

    public async Task<OrderResponseDto?> GetOrderByIdAsync(Guid id)
    {
        var order = await _orderRepository.GetByIdAsync(
            id,
            query => query.Include(o => o.Restaurant).Include(o => o.Items).ThenInclude(i => i.Box)
        );

        if (order == null) return null;
        return MapToDto(order, order.Restaurant);
    }

    public async Task<int> GetTodayTotalRescuedMealsAsync()
    {
        var today = DateTime.UtcNow.Date;
        var orders = await _orderRepository.FindAsync(o => o.CreatedAt >= today, q => q.Include(o => o.Items));
        int count = orders.SelectMany(o => o.Items).Sum(i => i.Quantity);
        return count;
    }

    private OrderResponseDto MapToDto(Order order, Restaurant restaurant)
    {
        return new OrderResponseDto
        {
            Id = order.Id,
            UserId = order.UserId,
            RestaurantId = order.RestaurantId,
            RestaurantName = restaurant?.Name ?? "",
            RestaurantImageUrl = restaurant?.ImageUrl ?? "",
            TotalAmount = order.TotalAmount,
            Status = order.Status,
            Type = order.Type,
            CreatedAt = order.CreatedAt,
            UpdatedAt = order.UpdatedAt ?? order.CreatedAt,
            Items = order.Items.Select(i => new OrderItemResponseDto
            {
                BoxId = i.BoxId,
                BoxName = i.Box?.Name ?? "",
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice,
                IsSuspended = i.IsSuspended
            }).ToList()
        };
    }
}
