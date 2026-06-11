namespace FoodyGo.Application.DTOs;

public class UserStatsDto
{
    public int TotalRescuedMeals { get; set; }
    public int TotalSuspendedMeals { get; set; }
    public double TotalCO2SavedKg { get; set; }
    public decimal TotalMoneySaved { get; set; }
}
