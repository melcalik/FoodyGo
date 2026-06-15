using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using FoodyGo.Core.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodyGo.API.Controllers;

[Route("api/[controller]")]
public class SuspendedMealsController : BaseController
{
    private readonly ISuspendedMealService _suspendedMealService;

    public SuspendedMealsController(ISuspendedMealService suspendedMealService)
    {
        _suspendedMealService = suspendedMealService;
    }

    [HttpGet("available")]
    public async Task<ActionResult<IEnumerable<SuspendedMealResponseDto>>> GetAvailable()
    {
        var meals = await _suspendedMealService.GetAvailableSuspendedMealsAsync();
        return Ok(meals);
    }

    [Authorize]
    [HttpPost("{id}/claim")]
    public async Task<ActionResult> Claim(Guid id)
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        var result = await _suspendedMealService.ClaimSuspendedMealAsync(id, userId.Value);

        return result
            ? Ok(new { message = Messages.Success.SuspendedMealClaimed })
            : BadRequest(new { message = Messages.Error.SuspendedMealAlreadyClaimed });
    }
}
