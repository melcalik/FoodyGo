namespace FoodyGo.Core.Entities;

public class PaymentMethod : BaseEntity
{
    public Guid UserId { get; set; }
    public User? User { get; set; }

    public string CardName { get; set; } = string.Empty;
    public string CardNumber { get; set; } = string.Empty;
    public string CardHolderName { get; set; } = string.Empty;
    public string Expiry { get; set; } = string.Empty;
    public string CVV { get; set; } = string.Empty;
    public bool IsLastUsed { get; set; } = false;
}
