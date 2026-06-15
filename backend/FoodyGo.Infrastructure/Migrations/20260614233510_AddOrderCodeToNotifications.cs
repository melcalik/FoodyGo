using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodyGo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderCodeToNotifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrderCode",
                table: "Notifications",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderCode",
                table: "Notifications");
        }
    }
}
