using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace FoodyGo.API.Controllers;

/// <summary>
/// Base controller providing shared helpers for authenticated endpoints.
/// </summary>
[ApiController]
public abstract class BaseController : ControllerBase
{
    /// <summary>
    /// Extracts the authenticated user's ID from the JWT claims.
    /// Returns null if the claim is missing or not a valid Guid.
    /// </summary>
    protected Guid? GetCurrentUserId()
    {
        var value = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(value, out var id) ? id : null;
    }
}
