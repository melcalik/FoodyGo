using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using FoodyGo.Core.Entities;
using FoodyGo.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FoodyGo.Application.Services;

public class AddressService : IAddressService
{
    private readonly IRepository<UserAddress> _addressRepo;

    public AddressService(IRepository<UserAddress> addressRepo)
    {
        _addressRepo = addressRepo;
    }

    public async Task<IEnumerable<AddressDto>> GetUserAddressesAsync(Guid userId)
    {
        var addresses = await _addressRepo.FindAsync(a => a.UserId == userId);
        return addresses.Select(MapToDto).ToList();
    }

    public async Task<AddressDto> AddAddressAsync(Guid userId, CreateAddressDto dto)
    {
        var existing = await _addressRepo.FindAsync(a => a.UserId == userId);
        
        var address = new UserAddress
        {
            UserId = userId,
            Title = string.IsNullOrWhiteSpace(dto.Title) ? "Ev" : dto.Title,
            City = dto.City,
            District = dto.District,
            AddressDetail = dto.AddressDetail,
            IsActive = !existing.Any()
        };

        await _addressRepo.AddAsync(address);
        return MapToDto(address);
    }

    public async Task SetActiveAddressAsync(Guid userId, Guid addressId)
    {
        var addresses = await _addressRepo.FindAsync(a => a.UserId == userId);
        foreach (var addr in addresses)
        {
            addr.IsActive = addr.Id == addressId;
            await _addressRepo.UpdateAsync(addr);
        }
    }

    public async Task DeleteAddressAsync(Guid userId, Guid addressId)
    {
        var address = (await _addressRepo.FindAsync(a => a.UserId == userId && a.Id == addressId)).FirstOrDefault();
        if (address != null)
        {
            await _addressRepo.DeleteAsync(address);
        }
    }

    private static AddressDto MapToDto(UserAddress address) => new()
    {
        Id = address.Id,
        Title = address.Title,
        City = address.City,
        District = address.District,
        AddressDetail = address.AddressDetail,
        IsActive = address.IsActive
    };
}
