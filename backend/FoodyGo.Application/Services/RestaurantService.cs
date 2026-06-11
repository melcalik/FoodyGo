using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using FoodyGo.Core.Entities;
using FoodyGo.Core.Interfaces;

namespace FoodyGo.Application.Services;

public class RestaurantService : IRestaurantService
{
    private readonly IRepository<Restaurant> _restaurantRepo;
    private readonly IRepository<Box> _boxRepo;
    private readonly IRepository<SuspendedMeal> _suspendedRepo;

    public RestaurantService(IRepository<Restaurant> restaurantRepo, IRepository<Box> boxRepo, IRepository<SuspendedMeal> suspendedRepo)
    {
        _restaurantRepo = restaurantRepo;
        _boxRepo = boxRepo;
        _suspendedRepo = suspendedRepo;
    }

    public async Task<IEnumerable<RestaurantDto>> GetAllRestaurantsAsync()
    {
        var restaurants = await _restaurantRepo.GetAllAsync();
        var suspendedMeals = await _suspendedRepo.GetAllAsync();

        return restaurants.Select(r => new RestaurantDto
        {
            Id = r.Id,
            Name = r.Name,
            Category = r.Category,
            Address = r.Address,
            Rating = r.Rating,
            ReviewCount = r.ReviewCount,
            ImageUrl = r.ImageUrl,
            Distance = r.Distance,
            DeliveryTime = r.DeliveryTime,
            SuspendedCount = suspendedMeals.Count(sm => sm.RestaurantId == r.Id && !sm.IsClaimed)
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
