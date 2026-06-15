using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using FoodyGo.Core.Entities;
using FoodyGo.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FoodyGo.Application.Services;

public class RestaurantService : IRestaurantService
{
    private readonly IRepository<Restaurant> _restaurantRepo;
    private readonly IRepository<Box> _boxRepo;
    private readonly IRepository<SuspendedMeal> _suspendedRepo;
    private readonly IRepository<Review> _reviewRepo;

    public RestaurantService(
        IRepository<Restaurant> restaurantRepo, 
        IRepository<Box> boxRepo, 
        IRepository<SuspendedMeal> suspendedRepo,
        IRepository<Review> reviewRepo)
    {
        _restaurantRepo = restaurantRepo;
        _boxRepo = boxRepo;
        _suspendedRepo = suspendedRepo;
        _reviewRepo = reviewRepo;
    }

    public async Task<IEnumerable<RestaurantDto>> GetAllRestaurantsAsync()
    {
        var restaurants = await _restaurantRepo.FindAsync(r => true, q => q.Include(r => r.Boxes));
        var suspendedMeals = await _suspendedRepo.GetAllAsync();
        var allReviews = await _reviewRepo.GetAllAsync();

        return restaurants.Select(r => 
        {
            var restReviews = allReviews.Where(rev => rev.RestaurantId == r.Id).ToList();
            var reviewCount = restReviews.Count;
            var rating = reviewCount > 0 ? Math.Round(restReviews.Average(rev => rev.Rating), 1) : 0;

            return new RestaurantDto
            {
                Id = r.Id,
                Name = r.Name,
                Category = r.Category,
                Address = r.Address,
                Rating = rating,
                ReviewCount = reviewCount,
                ImageUrl = r.ImageUrl,
                Distance = r.Distance,
                DeliveryTime = r.DeliveryTime,
                SuspendedCount = suspendedMeals.Count(sm => sm.RestaurantId == r.Id && !sm.IsClaimed),
                BoxNames = r.Boxes.Select(b => b.Name).ToList()
            };
        });
    }

    public async Task<IEnumerable<BoxDto>> GetBoxesByRestaurantAsync(Guid restaurantId)
    {
        var boxes = await _boxRepo.FindAsync(b => b.RestaurantId == restaurantId);

        return boxes.Select(b => new BoxDto
        {
            Id = b.Id,
            RestaurantId = b.RestaurantId,
            Name = b.Name,
            Description = b.Description,
            OriginalPrice = b.OriginalPrice,
            DiscountedPrice = b.DiscountedPrice,
            Stock = b.Stock,
            ImageUrl = b.ImageUrl
        });
    }
}
