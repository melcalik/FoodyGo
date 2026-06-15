using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodyGo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBoxImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("aaaa1111-1111-1111-1111-111111111111"),
                column: "ImageUrl",
                value: "sweet.png");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("aaaa2222-1111-1111-1111-111111111111"),
                column: "ImageUrl",
                value: "homemade.png");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("bbbb1111-2222-2222-2222-222222222222"),
                column: "ImageUrl",
                value: "homemade.png");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("bbbb2222-2222-2222-2222-222222222222"),
                column: "ImageUrl",
                value: "homemade.png");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("cccc1111-3333-3333-3333-333333333333"),
                column: "ImageUrl",
                value: "pizza.png");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("dddd1111-4444-4444-4444-444444444444"),
                column: "ImageUrl",
                value: "burger.png");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("eeee1111-5555-5555-5555-555555555555"),
                column: "ImageUrl",
                value: "kebab.png");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("eeee2222-5555-5555-5555-555555555555"),
                column: "ImageUrl",
                value: "kebab.png");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("aaaa1111-1111-1111-1111-111111111111"),
                column: "ImageUrl",
                value: "");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("aaaa2222-1111-1111-1111-111111111111"),
                column: "ImageUrl",
                value: "");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("bbbb1111-2222-2222-2222-222222222222"),
                column: "ImageUrl",
                value: "");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("bbbb2222-2222-2222-2222-222222222222"),
                column: "ImageUrl",
                value: "");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("cccc1111-3333-3333-3333-333333333333"),
                column: "ImageUrl",
                value: "");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("dddd1111-4444-4444-4444-444444444444"),
                column: "ImageUrl",
                value: "");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("eeee1111-5555-5555-5555-555555555555"),
                column: "ImageUrl",
                value: "");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: new Guid("eeee2222-5555-5555-5555-555555555555"),
                column: "ImageUrl",
                value: "");
        }
    }
}
