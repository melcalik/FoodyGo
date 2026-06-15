using Cronos;
using FoodyGo.Core.Entities;
using FoodyGo.Core.Enums;
using FoodyGo.Core.Constants;
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
        var cronExpression = CronExpression.Parse("*/10 * * * * *", CronFormat.IncludeSeconds);

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
                    
                    var notificationService = scope.ServiceProvider.GetRequiredService<FoodyGo.Application.Interfaces.INotificationService>();

                    foreach (var order in toReady)
                    {
                        order.Status = OrderStatus.ReadyForPickup;
                        order.UpdatedAt = now;
                        await notificationService.SendNotificationAsync(order.UserId, Messages.Notification.OrderReadyTitle, Messages.Notification.OrderReadyMessage, order.Id.ToString().Substring(32).ToUpper());
                    }

                    var pickupOrders = await dbContext.Orders
                        .Where(o => o.Status == OrderStatus.ReadyForPickup)
                        .ToListAsync(stoppingToken);

                    var toCompleted = pickupOrders.Where(o => o.UpdatedAt != null && o.UpdatedAt <= thirtySecondsAgo).ToList();

                    foreach (var order in toCompleted)
                    {
                        order.Status = OrderStatus.Completed;
                        order.UpdatedAt = now;
                        await notificationService.SendNotificationAsync(order.UserId, Messages.Notification.OrderDeliveredTitle, Messages.Notification.OrderDeliveredMessage, order.Id.ToString().Substring(32).ToUpper());
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

            var currentTime = DateTimeOffset.UtcNow;
            var next = cronExpression.GetNextOccurrence(currentTime, TimeZoneInfo.Utc);
            if (next.HasValue)
            {
                var delay = next.Value - currentTime;
                await Task.Delay(delay, stoppingToken);
            }
        }
    }
}
