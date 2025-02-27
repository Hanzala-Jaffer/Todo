using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TodoAPI.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "tblCategory",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Work" },
                    { 2, "Personal" }
                });

            migrationBuilder.InsertData(
                table: "tblTodoItem",
                columns: new[] { "Id", "CategoryId", "Description", "DueDate", "Priority" },
                values: new object[,]
                {
                    { 1, 1, "Prepare meeting agenda", new DateTime(2025, 2, 23, 0, 0, 0, 0, DateTimeKind.Local), 1 },
                    { 2, 2, "Buy groceries", new DateTime(2025, 2, 24, 0, 0, 0, 0, DateTimeKind.Local), 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "tblTodoItem",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "tblTodoItem",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "tblCategory",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "tblCategory",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
