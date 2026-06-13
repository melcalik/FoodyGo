using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using FoodyGo.Core.Entities;
using FoodyGo.Core.Interfaces;

namespace FoodyGo.Application.Services;

public class PaymentMethodService : IPaymentMethodService
{
    private readonly IRepository<PaymentMethod> _repository;

    public PaymentMethodService(IRepository<PaymentMethod> repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<PaymentMethodDto>> GetUserPaymentMethodsAsync(Guid userId)
    {
        var methods = await _repository.FindAsync(p => p.UserId == userId);
        return methods.OrderByDescending(p => p.IsLastUsed).ThenByDescending(p => p.CreatedAt).Select(p => new PaymentMethodDto
        {
            Id = p.Id,
            CardName = p.CardName,
            CardNumber = p.CardNumber,
            CardHolderName = p.CardHolderName,
            Expiry = p.Expiry,
            CVV = p.CVV,
            IsLastUsed = p.IsLastUsed
        });
    }

    public async Task<PaymentMethodDto> AddPaymentMethodAsync(Guid userId, CreatePaymentMethodDto dto)
    {
        var methods = await _repository.FindAsync(p => p.UserId == userId);

        foreach (var m in methods)
        {
            if (m.IsLastUsed)
            {
                m.IsLastUsed = false;
                await _repository.UpdateAsync(m);
            }
        }

        var newMethod = new PaymentMethod
        {
            UserId = userId,
            CardName = dto.CardName,
            CardNumber = dto.CardNumber,
            CardHolderName = dto.CardHolderName,
            Expiry = dto.Expiry,
            CVV = dto.CVV,
            IsLastUsed = true
        };

        await _repository.AddAsync(newMethod);

        return new PaymentMethodDto
        {
            Id = newMethod.Id,
            CardName = newMethod.CardName,
            CardNumber = newMethod.CardNumber,
            CardHolderName = newMethod.CardHolderName,
            Expiry = newMethod.Expiry,
            CVV = newMethod.CVV,
            IsLastUsed = newMethod.IsLastUsed
        };
    }

    public async Task DeletePaymentMethodAsync(Guid userId, Guid paymentMethodId)
    {
        var method = await _repository.GetByIdAsync(paymentMethodId);
        if (method == null || method.UserId != userId)
        {
            throw new Exception("Payment method not found.");
        }

        await _repository.DeleteAsync(method);
    }

    public async Task SetLastUsedPaymentMethodAsync(Guid userId, Guid paymentMethodId)
    {
        var methods = await _repository.FindAsync(p => p.UserId == userId);
        
        foreach (var m in methods)
        {
            if (m.Id == paymentMethodId)
            {
                m.IsLastUsed = true;
                await _repository.UpdateAsync(m);
            }
            else if (m.IsLastUsed)
            {
                m.IsLastUsed = false;
                await _repository.UpdateAsync(m);
            }
        }
    }
}
