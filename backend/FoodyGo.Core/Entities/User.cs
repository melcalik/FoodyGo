namespace FoodyGo.Core.Entities;

public class User : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "User";
    public string Avatar { get; set; } = string.Empty;
    public decimal WalletBalance { get; set; } = 0;

    public ICollection<UserAddress> Addresses { get; set; } = new List<UserAddress>();
    public ICollection<Order> Orders { get; set; } = new List<Order>();
    public ICollection<SuspendedMeal> DonatedMeals { get; set; } = new List<SuspendedMeal>();
    public ICollection<PaymentMethod> PaymentMethods { get; set; } = new List<PaymentMethod>();
}
