using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class fixcategoriesoptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblOptionCategory_tblCategories_CategoryId",
                table: "tblOptionCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_tblOptionCategory_tblOptions_OptionsId",
                table: "tblOptionCategory");

            migrationBuilder.DropTable(
                name: "CategoryOptions");

            migrationBuilder.AddForeignKey(
                name: "FK_tblOptionCategory_tblCategories_CategoryId",
                table: "tblOptionCategory",
                column: "CategoryId",
                principalTable: "tblCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tblOptionCategory_tblOptions_OptionsId",
                table: "tblOptionCategory",
                column: "OptionsId",
                principalTable: "tblOptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblOptionCategory_tblCategories_CategoryId",
                table: "tblOptionCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_tblOptionCategory_tblOptions_OptionsId",
                table: "tblOptionCategory");

            migrationBuilder.CreateTable(
                name: "CategoryOptions",
                columns: table => new
                {
                    CategoriesId = table.Column<int>(type: "int", nullable: false),
                    OptionsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryOptions", x => new { x.CategoriesId, x.OptionsId });
                    table.ForeignKey(
                        name: "FK_CategoryOptions_tblCategories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "tblCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryOptions_tblOptions_OptionsId",
                        column: x => x.OptionsId,
                        principalTable: "tblOptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryOptions_OptionsId",
                table: "CategoryOptions",
                column: "OptionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblOptionCategory_tblCategories_CategoryId",
                table: "tblOptionCategory",
                column: "CategoryId",
                principalTable: "tblCategories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblOptionCategory_tblOptions_OptionsId",
                table: "tblOptionCategory",
                column: "OptionsId",
                principalTable: "tblOptions",
                principalColumn: "Id");
        }
    }
}
