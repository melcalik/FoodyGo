using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814

namespace FoodyGo.Infrastructure.Migrations
{

    public partial class InitialCreate : Migration
    {

        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Restaurants",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    Rating = table.Column<double>(type: "REAL", nullable: false),
                    ReviewCount = table.Column<int>(type: "INTEGER", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: false),
                    Distance = table.Column<string>(type: "TEXT", nullable: false),
                    DeliveryTime = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Restaurants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Boxes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    RestaurantId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    OriginalPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    DiscountedPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    Stock = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boxes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Boxes_Restaurants_RestaurantId",
                        column: x => x.RestaurantId,
                        principalTable: "Restaurants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    RestaurantId = table.Column<Guid>(type: "TEXT", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "TEXT", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Restaurants_RestaurantId",
                        column: x => x.RestaurantId,
                        principalTable: "Restaurants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SuspendedMeals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    DonorUserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    RestaurantId = table.Column<Guid>(type: "TEXT", nullable: false),
                    BoxId = table.Column<Guid>(type: "TEXT", nullable: false),
                    IsClaimed = table.Column<bool>(type: "INTEGER", nullable: false),
                    ClaimedByUserId = table.Column<Guid>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuspendedMeals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SuspendedMeals_Boxes_BoxId",
                        column: x => x.BoxId,
                        principalTable: "Boxes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SuspendedMeals_Restaurants_RestaurantId",
                        column: x => x.RestaurantId,
                        principalTable: "Restaurants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SuspendedMeals_Users_DonorUserId",
                        column: x => x.DonorUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    OrderId = table.Column<Guid>(type: "TEXT", nullable: false),
                    BoxId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Boxes_BoxId",
                        column: x => x.BoxId,
                        principalTable: "Boxes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Restaurants",
                columns: new[] { "Id", "Address", "Category", "CreatedAt", "DeliveryTime", "Distance", "ImageUrl", "Name", "Rating", "ReviewCount", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), "Bağcılar Mah. No:14, Kadıköy", "sweet", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "19:00 - 21:00", "0.8 km", "sweet.png", "Pasta Dünyası", 4.7999999999999998, 142, null },
                    { new Guid("22222222-2222-2222-2222-222222222222"), "Moda Cad. No:55, Kadıköy", "homemade", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "18:30 - 20:30", "1.2 km", "homemade.png", "Annem Gibi", 4.5999999999999996, 89, null },
                    { new Guid("33333333-3333-3333-3333-333333333333"), "İstiklal Cad. No:87, Beyoğlu", "pizza", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "20:00 - 22:00", "2.1 km", "pizza.png", "Forno Napoli", 4.7000000000000002, 213, null },
                    { new Guid("44444444-4444-4444-4444-444444444444"), "Abdi İpekçi Cad. No:12, Nişantaşı", "burger", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "21:00 - 23:00", "3.4 km", "burger.png", "Smash Bros. Burger", 4.5, 176, null },
                    { new Guid("55555555-5555-5555-5555-555555555555"), "Bağlarbaşı Mah. No:3, Üsküdar", "kebab", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "20:30 - 22:30", "1.7 km", "kebab.png", "Ustanın Döneri", 4.9000000000000004, 308, null },
                    { new Guid("66666666-6666-6666-6666-666666666666"), "Karaköy Mah. No:3, Beyoğlu", "sweet", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "18:00 - 20:00", "4.2 km", "sweet.png", "Güllüoğlu Baklava", 4.9000000000000004, 421, null }
                });

            migrationBuilder.InsertData(
                table: "Boxes",
                columns: new[] { "Id", "CreatedAt", "Description", "DiscountedPrice", "ImageUrl", "Name", "OriginalPrice", "RestaurantId", "Stock", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("aaaa1111-1111-1111-1111-111111111111"), new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Günün bakiye tatlılarından oluşan mix kutu", 65m, "", "Tatlı Sürpriz Kutu", 180m, new Guid("11111111-1111-1111-1111-111111111111"), 4, null },
                    { new Guid("aaaa2222-1111-1111-1111-111111111111"), new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Taze pişmiş böreklerden oluşan kutu", 45m, "", "Mini Börek Kutusu", 120m, new Guid("11111111-1111-1111-1111-111111111111"), 2, null },
                    { new Guid("bbbb1111-2222-2222-2222-222222222222"), new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Günlük ana yemek + çorba + pilav seti", 75m, "", "Ev Yemeği Seti", 200m, new Guid("22222222-2222-2222-2222-222222222222"), 3, null },
                    { new Guid("bbbb2222-2222-2222-2222-222222222222"), new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Günün bakiyesinden sürpriz tabldot", 55m, "", "Böyle Kutu", 150m, new Guid("22222222-2222-2222-2222-222222222222"), 5, null },
                    { new Guid("cccc1111-3333-3333-3333-333333333333"), new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "2 dilim artisan pizza + içecek", 80m, "", "Pizza Sürpriz", 220m, new Guid("33333333-3333-3333-3333-333333333333"), 6, null },
                    { new Guid("dddd1111-4444-4444-4444-444444444444"), new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Smash burger + patates kızartması", 110m, "", "Burger Kutusu", 280m, new Guid("44444444-4444-4444-4444-444444444444"), 2, null },
                    { new Guid("eeee1111-5555-5555-5555-555555555555"), new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Tavuk veya et döner dürüm + ayran", 60m, "", "Döner Dürüm Seti", 160m, new Guid("55555555-5555-5555-5555-555555555555"), 8, null },
                    { new Guid("eeee2222-5555-5555-5555-555555555555"), new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Döner tabak + salata + ekmek", 75m, "", "Tabak Set", 200m, new Guid("55555555-5555-5555-5555-555555555555"), 4, null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Boxes_RestaurantId",
                table: "Boxes",
                column: "RestaurantId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_BoxId",
                table: "OrderItems",
                column: "BoxId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_RestaurantId",
                table: "Orders",
                column: "RestaurantId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SuspendedMeals_BoxId",
                table: "SuspendedMeals",
                column: "BoxId");

            migrationBuilder.CreateIndex(
                name: "IX_SuspendedMeals_DonorUserId",
                table: "SuspendedMeals",
                column: "DonorUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SuspendedMeals_RestaurantId",
                table: "SuspendedMeals",
                column: "RestaurantId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "SuspendedMeals");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Boxes");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Restaurants");
        }
    }
}
