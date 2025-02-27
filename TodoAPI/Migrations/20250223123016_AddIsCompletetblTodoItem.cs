using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddIsCompletetblTodoItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsComplete",
                table: "tblTodoItem",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "tblTodoItem",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DueDate", "IsComplete" },
                values: new object[] { new DateTime(2025, 2, 24, 0, 0, 0, 0, DateTimeKind.Local), false });

            migrationBuilder.UpdateData(
                table: "tblTodoItem",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "DueDate", "IsComplete" },
                values: new object[] { new DateTime(2025, 2, 25, 0, 0, 0, 0, DateTimeKind.Local), false });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsComplete",
                table: "tblTodoItem");

            migrationBuilder.UpdateData(
                table: "tblTodoItem",
                keyColumn: "Id",
                keyValue: 1,
                column: "DueDate",
                value: new DateTime(2025, 2, 23, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "tblTodoItem",
                keyColumn: "Id",
                keyValue: 2,
                column: "DueDate",
                value: new DateTime(2025, 2, 24, 0, 0, 0, 0, DateTimeKind.Local));
        }
    }
}
