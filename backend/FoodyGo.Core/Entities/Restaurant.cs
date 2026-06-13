namespace FoodyGo.Core.Entities;

public class Restaurant : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public double Rating { get; set; } = 5.0;
    public int ReviewCount { get; set; } = 0;
    public string ImageUrl { get; set; } = string.Empty;
    public string Distance { get; set; } = string.Empty;
    public string DeliveryTime { get; set; } = string.Empty;

    public ICollection<Box> Boxes { get; set; } = new List<Box>();
    public ICollection<Order> Orders { get; set; } = new List<Order>();
    public ICollection<SuspendedMeal> SuspendedMeals { get; set; } = new List<SuspendedMeal>();
}
