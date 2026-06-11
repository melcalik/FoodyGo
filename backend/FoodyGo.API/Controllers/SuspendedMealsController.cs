using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
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
            ? Ok(new { message = "Suspended meal claimed successfully." })
            : BadRequest(new { message = "This meal has already been claimed or does not exist." });
    }
}
