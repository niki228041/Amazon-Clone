using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class anotherfix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblProducts_tblCategories_CategoryId",
                table: "tblProducts");

            migrationBuilder.AddForeignKey(
                name: "FK_tblProducts_tblCategories_CategoryId",
                table: "tblProducts",
                column: "CategoryId",
                principalTable: "tblCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblProducts_tblCategories_CategoryId",
                table: "tblProducts");

            migrationBuilder.AddForeignKey(
                name: "FK_tblProducts_tblCategories_CategoryId",
                table: "tblProducts",
                column: "CategoryId",
                principalTable: "tblCategories",
                principalColumn: "Id");
        }
    }
}
