using Microsoft.EntityFrameworkCore;
using FoodyGo.Core.Entities;

namespace FoodyGo.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Restaurant> Restaurants { get; set; } = null!;
    public DbSet<Box> Boxes { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<OrderItem> OrderItems { get; set; } = null!;
    public DbSet<SuspendedMeal> SuspendedMeals { get; set; } = null!;
    public DbSet<Review> Reviews { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Guids for Seed Data
        var r1Id = Guid.Parse("11111111-1111-1111-1111-111111111111");
        var r2Id = Guid.Parse("22222222-2222-2222-2222-222222222222");
        var r3Id = Guid.Parse("33333333-3333-3333-3333-333333333333");
        var r4Id = Guid.Parse("44444444-4444-4444-4444-444444444444");
        var r5Id = Guid.Parse("55555555-5555-5555-5555-555555555555");
        var r6Id = Guid.Parse("66666666-6666-6666-6666-666666666666");

        var fixedDate = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        // Seed Restaurants
        modelBuilder.Entity<Restaurant>().HasData(
            new Restaurant { Id = r1Id, Name = "Pasta Dünyası", Category = "sweet", Address = "Bağcılar Mah. No:14, Kadıköy", Rating = 4.8, ReviewCount = 142, Distance = "0.8 km", DeliveryTime = "19:00 - 21:00", ImageUrl = "sweet.png", CreatedAt = fixedDate },
            new Restaurant { Id = r2Id, Name = "Annem Gibi", Category = "homemade", Address = "Moda Cad. No:55, Kadıköy", Rating = 4.6, ReviewCount = 89, Distance = "1.2 km", DeliveryTime = "18:30 - 20:30", ImageUrl = "homemade.png", CreatedAt = fixedDate },
            new Restaurant { Id = r3Id, Name = "Forno Napoli", Category = "pizza", Address = "İstiklal Cad. No:87, Beyoğlu", Rating = 4.7, ReviewCount = 213, Distance = "2.1 km", DeliveryTime = "20:00 - 22:00", ImageUrl = "pizza.png", CreatedAt = fixedDate },
            new Restaurant { Id = r4Id, Name = "Smash Bros. Burger", Category = "burger", Address = "Abdi İpekçi Cad. No:12, Nişantaşı", Rating = 4.5, ReviewCount = 176, Distance = "3.4 km", DeliveryTime = "21:00 - 23:00", ImageUrl = "burger.png", CreatedAt = fixedDate },
            new Restaurant { Id = r5Id, Name = "Ustanın Döneri", Category = "kebab", Address = "Bağlarbaşı Mah. No:3, Üsküdar", Rating = 4.9, ReviewCount = 308, Distance = "1.7 km", DeliveryTime = "20:30 - 22:30", ImageUrl = "kebab.png", CreatedAt = fixedDate },
            new Restaurant { Id = r6Id, Name = "Güllüoğlu Baklava", Category = "sweet", Address = "Karaköy Mah. No:3, Beyoğlu", Rating = 4.9, ReviewCount = 421, Distance = "4.2 km", DeliveryTime = "18:00 - 20:00", ImageUrl = "sweet.png", CreatedAt = fixedDate }
        );

        // Seed Boxes
        modelBuilder.Entity<Box>().HasData(
            new Box { Id = Guid.Parse("aaaa1111-1111-1111-1111-111111111111"), RestaurantId = r1Id, Name = "Tatlı Sürpriz Kutu", Description = "Günün bakiye tatlılarından oluşan mix kutu", OriginalPrice = 180, DiscountedPrice = 65, Stock = 4, CreatedAt = fixedDate },
            new Box { Id = Guid.Parse("aaaa2222-1111-1111-1111-111111111111"), RestaurantId = r1Id, Name = "Mini Börek Kutusu", Description = "Taze pişmiş böreklerden oluşan kutu", OriginalPrice = 120, DiscountedPrice = 45, Stock = 2, CreatedAt = fixedDate },
            new Box { Id = Guid.Parse("bbbb1111-2222-2222-2222-222222222222"), RestaurantId = r2Id, Name = "Ev Yemeği Seti", Description = "Günlük ana yemek + çorba + pilav seti", OriginalPrice = 200, DiscountedPrice = 75, Stock = 3, CreatedAt = fixedDate },
            new Box { Id = Guid.Parse("bbbb2222-2222-2222-2222-222222222222"), RestaurantId = r2Id, Name = "Böyle Kutu", Description = "Günün bakiyesinden sürpriz tabldot", OriginalPrice = 150, DiscountedPrice = 55, Stock = 5, CreatedAt = fixedDate },
            new Box { Id = Guid.Parse("cccc1111-3333-3333-3333-333333333333"), RestaurantId = r3Id, Name = "Pizza Sürpriz", Description = "2 dilim artisan pizza + içecek", OriginalPrice = 220, DiscountedPrice = 80, Stock = 6, CreatedAt = fixedDate },
            new Box { Id = Guid.Parse("dddd1111-4444-4444-4444-444444444444"), RestaurantId = r4Id, Name = "Burger Kutusu", Description = "Smash burger + patates kızartması", OriginalPrice = 280, DiscountedPrice = 110, Stock = 2, CreatedAt = fixedDate },
            new Box { Id = Guid.Parse("eeee1111-5555-5555-5555-555555555555"), RestaurantId = r5Id, Name = "Döner Dürüm Seti", Description = "Tavuk veya et döner dürüm + ayran", OriginalPrice = 160, DiscountedPrice = 60, Stock = 8, CreatedAt = fixedDate },
            new Box { Id = Guid.Parse("eeee2222-5555-5555-5555-555555555555"), RestaurantId = r5Id, Name = "Tabak Set", Description = "Döner tabak + salata + ekmek", OriginalPrice = 200, DiscountedPrice = 75, Stock = 4, CreatedAt = fixedDate }
        );
    }
}
