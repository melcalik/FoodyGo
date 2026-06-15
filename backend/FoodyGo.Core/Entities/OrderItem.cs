namespace FoodyGo.Core.Entities;

public class OrderItem : BaseEntity
{
    public Guid OrderId { get; set; }
    public Order? Order { get; set; }

    public Guid BoxId { get; set; }
    public Box? Box { get; set; }

    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public bool IsSuspended { get; set; }
}
