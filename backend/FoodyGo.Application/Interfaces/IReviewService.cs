using FoodyGo.Application.DTOs;

namespace FoodyGo.Application.Interfaces;

public interface IReviewService
{
    Task<ReviewResponseDto> AddReviewAsync(Guid userId, CreateReviewDto dto);
    Task<IEnumerable<ReviewResponseDto>> GetReviewsByRestaurantIdAsync(Guid restaurantId);
}
