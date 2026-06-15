using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace FoodyGo.API.Controllers;

[ApiController]
public abstract class BaseController : ControllerBase
{

    protected Guid? GetCurrentUserId()
    {
        var value = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(value, out var id) ? id : null;
    }
}
