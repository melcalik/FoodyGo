using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodyGo.API.Controllers;

[Route("api/[controller]")]
[Authorize]
public class UsersController : BaseController
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("stats")]
    public async Task<ActionResult<UserStatsDto>> GetStats()
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        var stats = await _userService.GetUserStatsAsync(userId.Value);
        return Ok(stats);
    }

    [HttpPut("profile")]
    public async Task<ActionResult<UserDto>> UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        try
        {
            var updatedUser = await _userService.UpdateUserAsync(userId.Value, dto);
            return Ok(updatedUser);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
