using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class albumrelationshipwithuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "tblAlbum",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblAlbum_UserId",
                table: "tblAlbum",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblAlbum_AspNetUsers_UserId",
                table: "tblAlbum",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblAlbum_AspNetUsers_UserId",
                table: "tblAlbum");

            migrationBuilder.DropIndex(
                name: "IX_tblAlbum_UserId",
                table: "tblAlbum");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "tblAlbum");
        }
    }
}
