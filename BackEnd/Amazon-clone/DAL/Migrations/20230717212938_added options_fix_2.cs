using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class addedoptions_fix_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblVariant_tblProducts_ProductId",
                table: "tblVariant");

            migrationBuilder.DropIndex(
                name: "IX_tblVariant_ProductId",
                table: "tblVariant");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "tblVariant");

            migrationBuilder.CreateTable(
                name: "ProductVariant",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    VariantsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductVariant", x => new { x.ProductId, x.VariantsId });
                    table.ForeignKey(
                        name: "FK_ProductVariant_tblProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "tblProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductVariant_tblVariant_VariantsId",
                        column: x => x.VariantsId,
                        principalTable: "tblVariant",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblVariantProduct",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VariantId = table.Column<int>(type: "int", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblVariantProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblVariantProduct_tblProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "tblProducts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblVariantProduct_tblVariant_VariantId",
                        column: x => x.VariantId,
                        principalTable: "tblVariant",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductVariant_VariantsId",
                table: "ProductVariant",
                column: "VariantsId");

            migrationBuilder.CreateIndex(
                name: "IX_tblVariantProduct_ProductId",
                table: "tblVariantProduct",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_tblVariantProduct_VariantId",
                table: "tblVariantProduct",
                column: "VariantId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductVariant");

            migrationBuilder.DropTable(
                name: "tblVariantProduct");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "tblVariant",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblVariant_ProductId",
                table: "tblVariant",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblVariant_tblProducts_ProductId",
                table: "tblVariant",
                column: "ProductId",
                principalTable: "tblProducts",
                principalColumn: "Id");
        }
    }
}
