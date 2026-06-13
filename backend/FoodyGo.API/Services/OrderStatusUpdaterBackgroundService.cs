using FoodyGo.Core.Entities;
using FoodyGo.Core.Enums;
using FoodyGo.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace FoodyGo.API.Services;

public class OrderStatusUpdaterBackgroundService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<OrderStatusUpdaterBackgroundService> _logger;

    public OrderStatusUpdaterBackgroundService(IServiceProvider serviceProvider, ILogger<OrderStatusUpdaterBackgroundService> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                    
                    var now = DateTime.UtcNow;

                    var thirtySecondsAgo = now.AddSeconds(-30);
                    var confirmedOrders = await dbContext.Orders
                        .Where(o => o.Status == OrderStatus.Confirmed)
                        .ToListAsync(stoppingToken);

                    var toReady = confirmedOrders.Where(o => o.CreatedAt <= thirtySecondsAgo).ToList();

                    foreach (var order in toReady)
                    {
                        order.Status = OrderStatus.ReadyForPickup;
                        order.UpdatedAt = now;
                    }

                    var pickupOrders = await dbContext.Orders
                        .Where(o => o.Status == OrderStatus.ReadyForPickup)
                        .ToListAsync(stoppingToken);

                    var toCompleted = pickupOrders.Where(o => o.UpdatedAt != null && o.UpdatedAt <= thirtySecondsAgo).ToList();

                    foreach (var order in toCompleted)
                    {
                        order.Status = OrderStatus.Completed;
                        order.UpdatedAt = now;
                    }

                    if (toReady.Any() || toCompleted.Any())
                    {
                        await dbContext.SaveChangesAsync(stoppingToken);
                        _logger.LogInformation("Updated {ReadyCount} orders to ReadyForPickup and {CompletedCount} orders to Completed.", toReady.Count, toCompleted.Count);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating order statuses.");
            }

            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
        }
    }
}
