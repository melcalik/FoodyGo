using FoodyGo.Application.DTOs;

namespace FoodyGo.Application.Interfaces;

public interface IOrderService
{
    Task<OrderResponseDto> CreateOrderAsync(Guid userId, CreateOrderDto createOrderDto);
    Task<IEnumerable<OrderResponseDto>> GetOrdersByUserIdAsync(Guid userId);
    Task<OrderResponseDto?> GetOrderByIdAsync(Guid id);
}
