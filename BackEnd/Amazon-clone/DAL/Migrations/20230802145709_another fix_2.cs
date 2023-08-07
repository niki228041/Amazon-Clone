using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class anotherfix_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblVariantProduct_tblProducts_ProductId",
                table: "tblVariantProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_tblVariantProduct_tblVariant_VariantId",
                table: "tblVariantProduct");

            migrationBuilder.DropTable(
                name: "ProductVariant");

            migrationBuilder.AddForeignKey(
                name: "FK_tblVariantProduct_tblProducts_ProductId",
                table: "tblVariantProduct",
                column: "ProductId",
                principalTable: "tblProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tblVariantProduct_tblVariant_VariantId",
                table: "tblVariantProduct",
                column: "VariantId",
                principalTable: "tblVariant",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblVariantProduct_tblProducts_ProductId",
                table: "tblVariantProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_tblVariantProduct_tblVariant_VariantId",
                table: "tblVariantProduct");

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

            migrationBuilder.CreateIndex(
                name: "IX_ProductVariant_VariantsId",
                table: "ProductVariant",
                column: "VariantsId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblVariantProduct_tblProducts_ProductId",
                table: "tblVariantProduct",
                column: "ProductId",
                principalTable: "tblProducts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblVariantProduct_tblVariant_VariantId",
                table: "tblVariantProduct",
                column: "VariantId",
                principalTable: "tblVariant",
                principalColumn: "Id");
        }
    }
}
