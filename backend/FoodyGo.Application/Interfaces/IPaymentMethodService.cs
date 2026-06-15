using FoodyGo.Application.DTOs;

namespace FoodyGo.Application.Interfaces;

public interface IPaymentMethodService
{
    Task<IEnumerable<PaymentMethodDto>> GetUserPaymentMethodsAsync(Guid userId);
    Task<PaymentMethodDto> AddPaymentMethodAsync(Guid userId, CreatePaymentMethodDto dto);
    Task DeletePaymentMethodAsync(Guid userId, Guid paymentMethodId);
    Task SetLastUsedPaymentMethodAsync(Guid userId, Guid paymentMethodId);
}
