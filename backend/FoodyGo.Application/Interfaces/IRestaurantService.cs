using FoodyGo.Application.DTOs;

namespace FoodyGo.Application.Interfaces;

public interface IRestaurantService
{
    Task<IEnumerable<RestaurantDto>> GetAllRestaurantsAsync();
    Task<IEnumerable<BoxDto>> GetBoxesByRestaurantAsync(Guid restaurantId);
}
