using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using FoodyGo.Core.Entities;
using FoodyGo.Core.Interfaces;
using FoodyGo.Core.Constants;
using Microsoft.EntityFrameworkCore;

namespace FoodyGo.Application.Services;

public class ReviewService : IReviewService
{
    private readonly IRepository<Review> _reviewRepository;
    private readonly IRepository<Restaurant> _restaurantRepository;

    public ReviewService(
        IRepository<Review> reviewRepository,
        IRepository<Restaurant> restaurantRepository)
    {
        _reviewRepository = reviewRepository;
        _restaurantRepository = restaurantRepository;
    }

    public async Task<ReviewResponseDto> AddReviewAsync(Guid userId, CreateReviewDto dto)
    {
        if (dto.Rating < 1 || dto.Rating > 5)
            throw new ArgumentException(Messages.Validation.InvalidRating);

        var existingReview = await _reviewRepository.FindAsync(r => r.OrderId == dto.OrderId);
        if (existingReview.Any())
            throw new Exception(Messages.Error.AlreadyReviewed);

        var restaurant = await _restaurantRepository.GetByIdAsync(dto.RestaurantId);
        if (restaurant == null) throw new Exception(Messages.Error.RestaurantNotFound);

        var review = new Review
        {
            UserId = userId,
            RestaurantId = dto.RestaurantId,
            OrderId = dto.OrderId,
            Rating = dto.Rating,
            Comment = dto.Comment
        };

        await _reviewRepository.AddAsync(review);

        var allReviews = await _reviewRepository.FindAsync(r => r.RestaurantId == dto.RestaurantId);
        restaurant.ReviewCount = allReviews.Count();
        restaurant.Rating = Math.Round(allReviews.Average(r => r.Rating), 1);
        await _restaurantRepository.UpdateAsync(restaurant);

        var added = (await _reviewRepository.FindAsync(
            r => r.Id == review.Id,
            query => query.Include(r => r.User)
        )).First();

        return MapToDto(added);
    }

    public async Task<IEnumerable<ReviewResponseDto>> GetReviewsByRestaurantIdAsync(Guid restaurantId)
    {
        var reviews = await _reviewRepository.FindAsync(
            r => r.RestaurantId == restaurantId,
            query => query.Include(r => r.User).Include(r => r.Order).ThenInclude(o => o.Items).ThenInclude(i => i.Box)
        );

        return reviews.Select(MapToDto).OrderByDescending(r => r.CreatedAt);
    }

    private static ReviewResponseDto MapToDto(Review rev) => new()
    {
        Id = rev.Id,
        RestaurantId = rev.RestaurantId,
        UserId = rev.UserId,
        UserName = rev.User?.Name ?? Messages.Common.Empty,
        UserAvatar = rev.User?.AvatarUrl ?? Messages.Common.Empty,
        OrderId = rev.OrderId,
        Rating = rev.Rating,
        Comment = rev.Comment,
        CreatedAt = rev.CreatedAt,
        OrderItems = rev.Order?.Items.Select(i => i.Box?.Name ?? Messages.Common.UnknownProduct).ToList() ?? new List<string>()
    };
}
