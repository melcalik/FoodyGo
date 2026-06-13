using System.ComponentModel.DataAnnotations;

namespace FoodyGo.Application.DTOs;

public class PaymentMethodDto
{
    public Guid Id { get; set; }
    public string CardName { get; set; } = string.Empty;
    public string CardNumber { get; set; } = string.Empty;
    public string CardHolderName { get; set; } = string.Empty;
    public string Expiry { get; set; } = string.Empty;
    public string CVV { get; set; } = string.Empty;
    public bool IsLastUsed { get; set; }
}

public class CreatePaymentMethodDto
{
    [Required]
    public string CardName { get; set; } = string.Empty;
    [Required]
    public string CardNumber { get; set; } = string.Empty;
    [Required]
    public string CardHolderName { get; set; } = string.Empty;
    [Required]
    public string Expiry { get; set; } = string.Empty;
    [Required]
    public string CVV { get; set; } = string.Empty;
}
