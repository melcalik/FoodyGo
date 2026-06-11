namespace FoodyGo.Core.Entities;

public class SuspendedMeal : BaseEntity
{
    // The user who donated it
    public Guid DonorUserId { get; set; }
    public User DonorUser { get; set; } = null!;

    public Guid RestaurantId { get; set; }
    public Restaurant Restaurant { get; set; } = null!;

    public Guid BoxId { get; set; }
    public Box Box { get; set; } = null!;

    public bool IsClaimed { get; set; } = false;
    public Guid? ClaimedByUserId { get; set; } // If someone claims it (optional)
}
