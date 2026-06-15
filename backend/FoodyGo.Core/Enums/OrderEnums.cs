namespace FoodyGo.Core.Enums;

public enum OrderType
{
    Standard = 1,
    Suspended = 2,
    ClaimedSuspended = 3
}

public enum OrderStatus
{
    Pending = 1,
    Confirmed = 2,
    Preparing = 3,
    ReadyForPickup = 4,
    Completed = 5,
    Cancelled = 6
}
