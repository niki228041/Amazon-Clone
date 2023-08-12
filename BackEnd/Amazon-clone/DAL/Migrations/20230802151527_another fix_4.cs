using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class anotherfix_4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderedProducts_tblOrders_OrderId",
                table: "OrderedProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderedProducts_tblProducts_ProductId",
                table: "OrderedProducts");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedProducts_tblOrders_OrderId",
                table: "OrderedProducts",
                column: "OrderId",
                principalTable: "tblOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedProducts_tblProducts_ProductId",
                table: "OrderedProducts",
                column: "ProductId",
                principalTable: "tblProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderedProducts_tblOrders_OrderId",
                table: "OrderedProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderedProducts_tblProducts_ProductId",
                table: "OrderedProducts");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedProducts_tblOrders_OrderId",
                table: "OrderedProducts",
                column: "OrderId",
                principalTable: "tblOrders",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedProducts_tblProducts_ProductId",
                table: "OrderedProducts",
                column: "ProductId",
                principalTable: "tblProducts",
                principalColumn: "Id");
        }
    }
}
