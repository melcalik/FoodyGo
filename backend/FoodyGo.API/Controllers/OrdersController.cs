using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodyGo.API.Controllers;

[Route("api/[controller]")]
[Authorize]
public class OrdersController : BaseController
{
    private readonly IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost]
    public async Task<ActionResult<OrderResponseDto>> CreateOrder([FromBody] CreateOrderDto createOrderDto)
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        try
        {
            var order = await _orderService.CreateOrderAsync(userId.Value, createOrderDto);
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderResponseDto>>> GetMyOrders()
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        var orders = await _orderService.GetOrdersByUserIdAsync(userId.Value);
        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderResponseDto>> GetOrder(Guid id)
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        var order = await _orderService.GetOrderByIdAsync(id);
        if (order is null) return NotFound();

        if (order.UserId != userId.Value) return Forbid();

        return Ok(order);
    }

    [HttpGet("daily-stats")]
    [AllowAnonymous]
    public async Task<ActionResult> GetDailyStats()
    {
        var count = await _orderService.GetTodayTotalRescuedMealsAsync();
        return Ok(new { count });
    }
}
