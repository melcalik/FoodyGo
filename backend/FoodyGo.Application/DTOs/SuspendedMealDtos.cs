namespace FoodyGo.Application.DTOs;

public class SuspendedMealResponseDto
{
    public Guid Id { get; set; }
    public Guid RestaurantId { get; set; }
    public string RestaurantName { get; set; } = string.Empty;
    public string RestaurantImageUrl { get; set; } = string.Empty;
    public Guid BoxId { get; set; }
    public string BoxName { get; set; } = string.Empty;
    public string DonorName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
