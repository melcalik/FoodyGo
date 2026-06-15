using FoodyGo.Application.DTOs;
using FoodyGo.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodyGo.API.Controllers;

[Route("api/[controller]")]
[Authorize]
public class NotificationsController : BaseController
{
    private readonly INotificationService _notificationService;

    public NotificationsController(INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NotificationDto>>> GetNotifications()
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        var notifications = await _notificationService.GetUserNotificationsAsync(userId.Value);
        return Ok(notifications);
    }

    [HttpPut("{id}/read")]
    public async Task<ActionResult> MarkAsRead(Guid id)
    {
        await _notificationService.MarkAsReadAsync(id);
        return NoContent();
    }

    [HttpPut("read-all")]
    public async Task<ActionResult> MarkAllAsRead()
    {
        var userId = GetCurrentUserId();
        if (userId is null) return Unauthorized();

        await _notificationService.MarkAllAsReadAsync(userId.Value);
        return NoContent();
    }
}
