using System.Security.Claims;
using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodyGo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PaymentMethodsController : ControllerBase
{
    private readonly IPaymentMethodService _paymentMethodService;

    public PaymentMethodsController(IPaymentMethodService paymentMethodService)
    {
        _paymentMethodService = paymentMethodService;
    }

    private Guid? GetCurrentUserId()
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (Guid.TryParse(userIdString, out var userId))
        {
            return userId;
        }
        return null;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PaymentMethodDto>>> GetPaymentMethods()
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var methods = await _paymentMethodService.GetUserPaymentMethodsAsync(userId.Value);
        return Ok(methods);
    }

    [HttpPost]
    public async Task<ActionResult<PaymentMethodDto>> AddPaymentMethod([FromBody] CreatePaymentMethodDto dto)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var method = await _paymentMethodService.AddPaymentMethodAsync(userId.Value, dto);
        return Ok(method);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePaymentMethod(Guid id)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        try
        {
            await _paymentMethodService.DeletePaymentMethodAsync(userId.Value, id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPut("{id}/set-last-used")]
    public async Task<IActionResult> SetLastUsed(Guid id)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        try
        {
            await _paymentMethodService.SetLastUsedPaymentMethodAsync(userId.Value, id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
