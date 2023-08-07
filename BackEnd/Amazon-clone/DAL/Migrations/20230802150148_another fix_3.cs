using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class anotherfix_3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblProductImages_tblProducts_ProductId",
                table: "tblProductImages");

            migrationBuilder.AddForeignKey(
                name: "FK_tblProductImages_tblProducts_ProductId",
                table: "tblProductImages",
                column: "ProductId",
                principalTable: "tblProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblProductImages_tblProducts_ProductId",
                table: "tblProductImages");

            migrationBuilder.AddForeignKey(
                name: "FK_tblProductImages_tblProducts_ProductId",
                table: "tblProductImages",
                column: "ProductId",
                principalTable: "tblProducts",
                principalColumn: "Id");
        }
    }
}
