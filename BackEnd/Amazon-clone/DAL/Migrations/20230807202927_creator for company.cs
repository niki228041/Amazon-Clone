using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class creatorforcompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatorId",
                table: "tblCompanies",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblCompanies_CreatorId",
                table: "tblCompanies",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblCompanies_AspNetUsers_CreatorId",
                table: "tblCompanies",
                column: "CreatorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblCompanies_AspNetUsers_CreatorId",
                table: "tblCompanies");

            migrationBuilder.DropIndex(
                name: "IX_tblCompanies_CreatorId",
                table: "tblCompanies");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "tblCompanies");
        }
    }
}
