using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class ordertablefix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblAddresses_tblOrders_OrderId",
                table: "tblAddresses");

            migrationBuilder.DropIndex(
                name: "IX_tblAddresses_OrderId",
                table: "tblAddresses");

            migrationBuilder.DropColumn(
                name: "Address_Id",
                table: "tblOrders");

            migrationBuilder.DropColumn(
                name: "Company_Id",
                table: "tblOrders");

            migrationBuilder.DropColumn(
                name: "User_Id",
                table: "tblOrders");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "tblAddresses");

            migrationBuilder.RenameColumn(
                name: "Created_At",
                table: "tblOrders",
                newName: "DateCreated");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "tblOrders",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "tblOrders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CardId",
                table: "tblOrders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "tblOrders",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "tblOrders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CardId",
                table: "Card",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OrderedProduct",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: true),
                    Count = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderedProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderedProduct_tblOrders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "tblOrders",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrderedProduct_tblProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "tblProducts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblOrders_AddressId",
                table: "tblOrders",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_tblOrders_CardId",
                table: "tblOrders",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_Card_CardId",
                table: "Card",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedProduct_OrderId",
                table: "OrderedProduct",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedProduct_ProductId",
                table: "OrderedProduct",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Card_Card_CardId",
                table: "Card",
                column: "CardId",
                principalTable: "Card",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrders_Card_CardId",
                table: "tblOrders",
                column: "CardId",
                principalTable: "Card",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblOrders_tblAddresses_AddressId",
                table: "tblOrders",
                column: "AddressId",
                principalTable: "tblAddresses",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Card_Card_CardId",
                table: "Card");

            migrationBuilder.DropForeignKey(
                name: "FK_tblOrders_Card_CardId",
                table: "tblOrders");

            migrationBuilder.DropForeignKey(
                name: "FK_tblOrders_tblAddresses_AddressId",
                table: "tblOrders");

            migrationBuilder.DropTable(
                name: "OrderedProduct");

            migrationBuilder.DropIndex(
                name: "IX_tblOrders_AddressId",
                table: "tblOrders");

            migrationBuilder.DropIndex(
                name: "IX_tblOrders_CardId",
                table: "tblOrders");

            migrationBuilder.DropIndex(
                name: "IX_Card_CardId",
                table: "Card");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "tblOrders");

            migrationBuilder.DropColumn(
                name: "CardId",
                table: "tblOrders");

            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "tblOrders");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "tblOrders");

            migrationBuilder.DropColumn(
                name: "CardId",
                table: "Card");

            migrationBuilder.RenameColumn(
                name: "DateCreated",
                table: "tblOrders",
                newName: "Created_At");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "tblOrders",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "Address_Id",
                table: "tblOrders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Company_Id",
                table: "tblOrders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "User_Id",
                table: "tblOrders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "tblAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblAddresses_OrderId",
                table: "tblAddresses",
                column: "OrderId",
                unique: true,
                filter: "[OrderId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_tblAddresses_tblOrders_OrderId",
                table: "tblAddresses",
                column: "OrderId",
                principalTable: "tblOrders",
                principalColumn: "Id");
        }
    }
}
