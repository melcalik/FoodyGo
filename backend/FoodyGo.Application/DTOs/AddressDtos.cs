using System.ComponentModel.DataAnnotations;

namespace FoodyGo.Application.DTOs;

public class AddressDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string AddressDetail { get; set; } = string.Empty;
    public bool IsActive { get; set; }
}

public class CreateAddressDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string City { get; set; } = string.Empty;

    [Required]
    public string District { get; set; } = string.Empty;

    [Required]
    public string AddressDetail { get; set; } = string.Empty;
}
