using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class fixcompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_tblCompanies_CompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Card_Card_CardId",
                table: "Card");

            migrationBuilder.DropIndex(
                name: "IX_Card_CardId",
                table: "Card");

            migrationBuilder.DropColumn(
                name: "CardId",
                table: "Card");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "tblCompanies",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(25)",
                oldMaxLength: 25);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "tblCompanies",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "tblCompanies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "tblCompanies",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isBossOfCompany",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_tblCompanies_CompanyId",
                table: "AspNetUsers",
                column: "CompanyId",
                principalTable: "tblCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_tblCompanies_CompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "tblCompanies");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "tblCompanies");

            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "tblCompanies");

            migrationBuilder.DropColumn(
                name: "isBossOfCompany",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "tblCompanies",
                type: "nvarchar(25)",
                maxLength: 25,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CardId",
                table: "Card",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Card_CardId",
                table: "Card",
                column: "CardId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_tblCompanies_CompanyId",
                table: "AspNetUsers",
                column: "CompanyId",
                principalTable: "tblCompanies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Card_Card_CardId",
                table: "Card",
                column: "CardId",
                principalTable: "Card",
                principalColumn: "Id");
        }
    }
}
