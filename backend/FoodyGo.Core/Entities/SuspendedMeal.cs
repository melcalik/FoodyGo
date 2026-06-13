namespace FoodyGo.Core.Entities;

public class SuspendedMeal : BaseEntity
{

    public Guid DonorUserId { get; set; }
    public User? DonorUser { get; set; }

    public Guid RestaurantId { get; set; }
    public Restaurant? Restaurant { get; set; }

    public Guid BoxId { get; set; }
    public Box? Box { get; set; }

    public bool IsClaimed { get; set; } = false;
    public Guid? ClaimedByUserId { get; set; }
}
