using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodyGo.API.Controllers;

[Route("api/[controller]")]
[Authorize]
public class ReviewsController : BaseController
{
    private readonly IReviewService _reviewService;

    public ReviewsController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [AllowAnonymous]
    [HttpGet("restaurant/{restaurantId}")]
    public async Task<ActionResult<IEnumerable<ReviewResponseDto>>> GetByRestaurantId(Guid restaurantId)
    {
        var reviews = await _reviewService.GetReviewsByRestaurantIdAsync(restaurantId);
        return Ok(reviews);
    }

    [HttpPost]
    public async Task<ActionResult<ReviewResponseDto>> AddReview(CreateReviewDto dto)
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        try
        {
            var review = await _reviewService.AddReviewAsync(userId.Value, dto);
            return Ok(review);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
