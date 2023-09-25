using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class addeduserIdfieldinproducttable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "tblProducts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblProducts_UserId",
                table: "tblProducts",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblProducts_AspNetUsers_UserId",
                table: "tblProducts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblProducts_AspNetUsers_UserId",
                table: "tblProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblProducts_UserId",
                table: "tblProducts");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "tblProducts");
        }
    }
}
