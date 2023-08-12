using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class ordertablefix_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderedProduct_tblOrders_OrderId",
                table: "OrderedProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderedProduct_tblProducts_ProductId",
                table: "OrderedProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_tblProducts_tblOrders_OrderId",
                table: "tblProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblProducts_OrderId",
                table: "tblProducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderedProduct",
                table: "OrderedProduct");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "tblProducts");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "tblOrders");

            migrationBuilder.RenameTable(
                name: "OrderedProduct",
                newName: "OrderedProducts");

            migrationBuilder.RenameIndex(
                name: "IX_OrderedProduct_ProductId",
                table: "OrderedProducts",
                newName: "IX_OrderedProducts_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderedProduct_OrderId",
                table: "OrderedProducts",
                newName: "IX_OrderedProducts_OrderId");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "tblOrders",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderedProducts",
                table: "OrderedProducts",
                column: "Id");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderedProducts_tblOrders_OrderId",
                table: "OrderedProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderedProducts_tblProducts_ProductId",
                table: "OrderedProducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderedProducts",
                table: "OrderedProducts");

            migrationBuilder.RenameTable(
                name: "OrderedProducts",
                newName: "OrderedProduct");

            migrationBuilder.RenameIndex(
                name: "IX_OrderedProducts_ProductId",
                table: "OrderedProduct",
                newName: "IX_OrderedProduct_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderedProducts_OrderId",
                table: "OrderedProduct",
                newName: "IX_OrderedProduct_OrderId");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "tblProducts",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "tblOrders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "tblOrders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderedProduct",
                table: "OrderedProduct",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_tblProducts_OrderId",
                table: "tblProducts",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedProduct_tblOrders_OrderId",
                table: "OrderedProduct",
                column: "OrderId",
                principalTable: "tblOrders",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedProduct_tblProducts_ProductId",
                table: "OrderedProduct",
                column: "ProductId",
                principalTable: "tblProducts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblProducts_tblOrders_OrderId",
                table: "tblProducts",
                column: "OrderId",
                principalTable: "tblOrders",
                principalColumn: "Id");
        }
    }
}
