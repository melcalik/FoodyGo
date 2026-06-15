using FoodyGo.Application.DTOs;

namespace FoodyGo.Application.Interfaces;

public interface IAddressService
{
    Task<IEnumerable<AddressDto>> GetUserAddressesAsync(Guid userId);
    Task<AddressDto> AddAddressAsync(Guid userId, CreateAddressDto dto);
    Task SetActiveAddressAsync(Guid userId, Guid addressId);
    Task DeleteAddressAsync(Guid userId, Guid addressId);
}
