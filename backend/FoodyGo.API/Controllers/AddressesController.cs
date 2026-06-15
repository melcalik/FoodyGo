using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodyGo.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AddressesController : ControllerBase
{
    private readonly IAddressService _addressService;

    public AddressesController(IAddressService addressService)
    {
        _addressService = addressService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AddressDto>>> GetUserAddresses()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var addresses = await _addressService.GetUserAddressesAsync(userId);
        return Ok(addresses);
    }

    [HttpPost]
    public async Task<ActionResult<AddressDto>> AddAddress([FromBody] CreateAddressDto dto)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var address = await _addressService.AddAddressAsync(userId, dto);
        return Ok(address);
    }

    [HttpPut("{id}/active")]
    public async Task<IActionResult> SetActiveAddress(Guid id)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await _addressService.SetActiveAddressAsync(userId, id);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAddress(Guid id)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await _addressService.DeleteAddressAsync(userId, id);
        return NoContent();
    }
}
