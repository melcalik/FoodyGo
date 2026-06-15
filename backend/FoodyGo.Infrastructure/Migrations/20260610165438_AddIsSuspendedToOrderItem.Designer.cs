
using System;
using FoodyGo.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FoodyGo.Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20260610165438_AddIsSuspendedToOrderItem")]
    partial class AddIsSuspendedToOrderItem
    {

        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "10.0.9");

            modelBuilder.Entity("FoodyGo.Core.Entities.Box", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("DiscountedPrice")
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("OriginalPrice")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("RestaurantId")
                        .HasColumnType("TEXT");

                    b.Property<int>("Stock")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RestaurantId");

                    b.ToTable("Boxes");

                    b.HasData(
                        new
                        {
                            Id = new Guid("aaaa1111-1111-1111-1111-111111111111"),
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            Description = "Günün bakiye tatlılarından oluşan mix kutu",
                            DiscountedPrice = 65m,
                            ImageUrl = "",
                            Name = "Tatlı Sürpriz Kutu",
                            OriginalPrice = 180m,
                            RestaurantId = new Guid("11111111-1111-1111-1111-111111111111"),
                            Stock = 4
                        },
                        new
                        {
                            Id = new Guid("aaaa2222-1111-1111-1111-111111111111"),
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            Description = "Taze pişmiş böreklerden oluşan kutu",
                            DiscountedPrice = 45m,
                            ImageUrl = "",
                            Name = "Mini Börek Kutusu",
                            OriginalPrice = 120m,
                            RestaurantId = new Guid("11111111-1111-1111-1111-111111111111"),
                            Stock = 2
                        },
                        new
                        {
                            Id = new Guid("bbbb1111-2222-2222-2222-222222222222"),
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            Description = "Günlük ana yemek + çorba + pilav seti",
                            DiscountedPrice = 75m,
                            ImageUrl = "",
                            Name = "Ev Yemeği Seti",
                            OriginalPrice = 200m,
                            RestaurantId = new Guid("22222222-2222-2222-2222-222222222222"),
                            Stock = 3
                        },
                        new
                        {
                            Id = new Guid("bbbb2222-2222-2222-2222-222222222222"),
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            Description = "Günün bakiyesinden sürpriz tabldot",
                            DiscountedPrice = 55m,
                            ImageUrl = "",
                            Name = "Böyle Kutu",
                            OriginalPrice = 150m,
                            RestaurantId = new Guid("22222222-2222-2222-2222-222222222222"),
                            Stock = 5
                        },
                        new
                        {
                            Id = new Guid("cccc1111-3333-3333-3333-333333333333"),
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            Description = "2 dilim artisan pizza + içecek",
                            DiscountedPrice = 80m,
                            ImageUrl = "",
                            Name = "Pizza Sürpriz",
                            OriginalPrice = 220m,
                            RestaurantId = new Guid("33333333-3333-3333-3333-333333333333"),
                            Stock = 6
                        },
                        new
                        {
                            Id = new Guid("dddd1111-4444-4444-4444-444444444444"),
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            Description = "Smash burger + patates kızartması",
                            DiscountedPrice = 110m,
                            ImageUrl = "",
                            Name = "Burger Kutusu",
                            OriginalPrice = 280m,
                            RestaurantId = new Guid("44444444-4444-4444-4444-444444444444"),
                            Stock = 2
                        },
                        new
                        {
                            Id = new Guid("eeee1111-5555-5555-5555-555555555555"),
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            Description = "Tavuk veya et döner dürüm + ayran",
                            DiscountedPrice = 60m,
                            ImageUrl = "",
                            Name = "Döner Dürüm Seti",
                            OriginalPrice = 160m,
                            RestaurantId = new Guid("55555555-5555-5555-5555-555555555555"),
                            Stock = 8
                        },
                        new
                        {
                            Id = new Guid("eeee2222-5555-5555-5555-555555555555"),
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            Description = "Döner tabak + salata + ekmek",
                            DiscountedPrice = 75m,
                            ImageUrl = "",
                            Name = "Tabak Set",
                            OriginalPrice = 200m,
                            RestaurantId = new Guid("55555555-5555-5555-5555-555555555555"),
                            Stock = 4
                        });
                });

            modelBuilder.Entity("FoodyGo.Core.Entities.Order", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("RestaurantId")
                        .HasColumnType("TEXT");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("TotalAmount")
                        .HasColumnType("TEXT");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RestaurantId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("FoodyGo.Core.Entities.OrderItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("BoxId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsSuspended")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("OrderId")
                        .HasColumnType("TEXT");

                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("UnitPrice")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("BoxId");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderItems");
                });

            modelBuilder.Entity("FoodyGo.Core.Entities.Restaurant", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("DeliveryTime")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Distance")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("Rating")
                        .HasColumnType("REAL");

                    b.Property<int>("ReviewCount")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Restaurants");

                    b.HasData(
                        new
                        {
                            Id = new Guid("11111111-1111-1111-1111-111111111111"),
                            Address = "Bağcılar Mah. No:14, Kadıköy",
                            Category = "sweet",
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            DeliveryTime = "19:00 - 21:00",
                            Distance = "0.8 km",
                            ImageUrl = "sweet.png",
                            Name = "Pasta Dünyası",
                            Rating = 4.7999999999999998,
                            ReviewCount = 142
                        },
                        new
                        {
                            Id = new Guid("22222222-2222-2222-2222-222222222222"),
                            Address = "Moda Cad. No:55, Kadıköy",
                            Category = "homemade",
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            DeliveryTime = "18:30 - 20:30",
                            Distance = "1.2 km",
                            ImageUrl = "homemade.png",
                            Name = "Annem Gibi",
                            Rating = 4.5999999999999996,
                            ReviewCount = 89
                        },
                        new
                        {
                            Id = new Guid("33333333-3333-3333-3333-333333333333"),
                            Address = "İstiklal Cad. No:87, Beyoğlu",
                            Category = "pizza",
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            DeliveryTime = "20:00 - 22:00",
                            Distance = "2.1 km",
                            ImageUrl = "pizza.png",
                            Name = "Forno Napoli",
                            Rating = 4.7000000000000002,
                            ReviewCount = 213
                        },
                        new
                        {
                            Id = new Guid("44444444-4444-4444-4444-444444444444"),
                            Address = "Abdi İpekçi Cad. No:12, Nişantaşı",
                            Category = "burger",
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            DeliveryTime = "21:00 - 23:00",
                            Distance = "3.4 km",
                            ImageUrl = "burger.png",
                            Name = "Smash Bros. Burger",
                            Rating = 4.5,
                            ReviewCount = 176
                        },
                        new
                        {
                            Id = new Guid("55555555-5555-5555-5555-555555555555"),
                            Address = "Bağlarbaşı Mah. No:3, Üsküdar",
                            Category = "kebab",
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            DeliveryTime = "20:30 - 22:30",
                            Distance = "1.7 km",
                            ImageUrl = "kebab.png",
                            Name = "Ustanın Döneri",
                            Rating = 4.9000000000000004,
                            ReviewCount = 308
                        },
                        new
                        {
                            Id = new Guid("66666666-6666-6666-6666-666666666666"),
                            Address = "Karaköy Mah. No:3, Beyoğlu",
                            Category = "sweet",
                            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                            DeliveryTime = "18:00 - 20:00",
                            Distance = "4.2 km",
                            ImageUrl = "sweet.png",
                            Name = "Güllüoğlu Baklava",
                            Rating = 4.9000000000000004,
                            ReviewCount = 421
                        });
                });

            modelBuilder.Entity("FoodyGo.Core.Entities.SuspendedMeal", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid>("BoxId")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("ClaimedByUserId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("DonorUserId")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsClaimed")
                        .HasColumnType("INTEGER");

                    b.Property<Guid>("RestaurantId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("BoxId");

                    b.HasIndex("DonorUserId");

                    b.HasIndex("RestaurantId");

                    b.ToTable("SuspendedMeals");
                });

            modelBuilder.Entity("FoodyGo.Core.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Avatar")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.Property<decimal>("WalletBalance")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("FoodyGo.Core.Entities.Box", b =>
                {
                    b.HasOne("FoodyGo.Core.Entities.Restaurant", "Restaurant")
                        .WithMany("Boxes")
                        .HasForeignKey("RestaurantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Restaurant");
                });

            modelBuilder.Entity("FoodyGo.Core.Entities.Order", b =>
                {
                    b.HasOne("FoodyGo.Core.Entities.Restaurant", "Restaurant")
                        .WithMany("Orders")
                        .HasForeignKey("RestaurantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FoodyGo.Core.Entities.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Restaurant");

                    b.Navigation("User");
                });

            modelBuilder.Entity("FoodyGo.Core.Entities.OrderItem", b =>
                {
                    b.HasOne("FoodyGo.Core.Entities.Box", "Box")
                        .WithMany()
                        .HasForeignKey("BoxId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FoodyGo.Core.Entities.Order", "Order")
                        .WithMany("Items")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Box");

                    b.Navigation("Order");
                });

            modelBuilder.Entity("FoodyGo.Core.Entities.SuspendedMeal", b =>
                {
                    b.HasOne("FoodyGo.Core.Entities.Box", "Box")
                        .WithMany()
                        .HasForeignKey("BoxId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FoodyGo.Core.Entities.User", "DonorUser")
                        .WithMany("DonatedMeals")
                        .HasForeignKey("DonorUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FoodyGo.Core.Entities.Restaurant", "Restaurant")
                        .WithMany("SuspendedMeals")
                        .HasForeignKey("RestaurantId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Box");

                    b.Navigation("DonorUser");

                    b.Navigation("Restaurant");
                });

            modelBuilder.Entity("FoodyGo.Core.Entities.Order", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("FoodyGo.Core.Entities.Restaurant", b =>
                {
                    b.Navigation("Boxes");

                    b.Navigation("Orders");

                    b.Navigation("SuspendedMeals");
                });

            modelBuilder.Entity("FoodyGo.Core.Entities.User", b =>
                {
                    b.Navigation("DonatedMeals");

                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
