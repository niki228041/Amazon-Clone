using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class addresstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Building",
                table: "tblAddresses");

            migrationBuilder.DropColumn(
                name: "State",
                table: "tblAddresses");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "tblAddresses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "tblAddresses",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "tblAddresses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "tblAddresses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "tblAddresses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "tblAddresses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "tblAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblAddresses_UserId",
                table: "tblAddresses",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_tblAddresses_AspNetUsers_UserId",
                table: "tblAddresses",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblAddresses_AspNetUsers_UserId",
                table: "tblAddresses");

            migrationBuilder.DropIndex(
                name: "IX_tblAddresses_UserId",
                table: "tblAddresses");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "tblAddresses");

            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "tblAddresses");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "tblAddresses");

            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "tblAddresses");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "tblAddresses");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "tblAddresses");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "tblAddresses");

            migrationBuilder.AddColumn<string>(
                name: "Building",
                table: "tblAddresses",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "tblAddresses",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }
    }
}
