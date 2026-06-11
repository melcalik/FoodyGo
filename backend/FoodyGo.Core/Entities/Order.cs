using FoodyGo.Core.Enums;

namespace FoodyGo.Core.Entities;

public class Order : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public Guid RestaurantId { get; set; }
    public Restaurant Restaurant { get; set; } = null!;

    public decimal TotalAmount { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public OrderType Type { get; set; } = OrderType.Standard;

    // Navigation Properties
    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
