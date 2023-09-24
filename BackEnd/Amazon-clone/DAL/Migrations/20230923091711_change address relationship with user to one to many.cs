using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class changeaddressrelationshipwithusertoonetomany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblAddresses_AspNetUsers_UserId",
                table: "tblAddresses");

            migrationBuilder.DropIndex(
                name: "IX_tblAddresses_UserId",
                table: "tblAddresses");

            migrationBuilder.CreateIndex(
                name: "IX_tblAddresses_UserId",
                table: "tblAddresses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblAddresses_AspNetUsers_UserId",
                table: "tblAddresses",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblAddresses_AspNetUsers_UserId",
                table: "tblAddresses");

            migrationBuilder.DropIndex(
                name: "IX_tblAddresses_UserId",
                table: "tblAddresses");

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
    }
}
