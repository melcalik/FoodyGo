using FoodyGo.API.Hubs;
using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using FoodyGo.Core.Entities;
using FoodyGo.Core.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace FoodyGo.API.Services;

public class NotificationService : INotificationService
{
    private readonly IRepository<Notification> _notificationRepo;
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationService(IRepository<Notification> notificationRepo, IHubContext<NotificationHub> hubContext)
    {
        _notificationRepo = notificationRepo;
        _hubContext = hubContext;
    }

    public async Task SendNotificationAsync(Guid userId, string title, string message, string? orderCode = null)
    {
        var notification = new Notification
        {
            UserId = userId,
            Title = title,
            Message = message,
            IsRead = false,
            OrderCode = orderCode
        };

        await _notificationRepo.AddAsync(notification);

        var dto = new NotificationDto
        {
            Id = notification.Id,
            Title = notification.Title,
            Message = notification.Message,
            IsRead = notification.IsRead,
            OrderCode = notification.OrderCode,
            CreatedAt = notification.CreatedAt
        };

        await _hubContext.Clients.Group(userId.ToString()).SendAsync("ReceiveNotification", dto);
    }

    public async Task<IEnumerable<NotificationDto>> GetUserNotificationsAsync(Guid userId)
    {
        var notifications = await _notificationRepo.FindAsync(n => n.UserId == userId);
        return notifications.OrderByDescending(n => n.CreatedAt).Select(n => new NotificationDto
        {
            Id = n.Id,
            Title = n.Title,
            Message = n.Message,
            IsRead = n.IsRead,
            OrderCode = n.OrderCode,
            CreatedAt = n.CreatedAt
        });
    }

    public async Task MarkAsReadAsync(Guid notificationId)
    {
        var notification = await _notificationRepo.GetByIdAsync(notificationId);
        if (notification != null && !notification.IsRead)
        {
            notification.IsRead = true;
            await _notificationRepo.UpdateAsync(notification);
        }
    }

    public async Task MarkAllAsReadAsync(Guid userId)
    {
        var notifications = await _notificationRepo.FindAsync(n => n.UserId == userId && !n.IsRead);
        foreach (var notification in notifications)
        {
            notification.IsRead = true;
            await _notificationRepo.UpdateAsync(notification);
        }
    }
}
