using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class addedoptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblOptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblOptions", x => x.Id);
                });

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

            migrationBuilder.CreateTable(
                name: "tblOptionCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    OptionsId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblOptionCategory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblOptionCategory_tblCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "tblCategories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblOptionCategory_tblOptions_OptionsId",
                        column: x => x.OptionsId,
                        principalTable: "tblOptions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "tblVariant",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OptionsId = table.Column<int>(type: "int", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblVariant", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblVariant_tblOptions_OptionsId",
                        column: x => x.OptionsId,
                        principalTable: "tblOptions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_tblVariant_tblProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "tblProducts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryOptions_OptionsId",
                table: "CategoryOptions",
                column: "OptionsId");

            migrationBuilder.CreateIndex(
                name: "IX_tblOptionCategory_CategoryId",
                table: "tblOptionCategory",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_tblOptionCategory_OptionsId",
                table: "tblOptionCategory",
                column: "OptionsId");

            migrationBuilder.CreateIndex(
                name: "IX_tblVariant_OptionsId",
                table: "tblVariant",
                column: "OptionsId");

            migrationBuilder.CreateIndex(
                name: "IX_tblVariant_ProductId",
                table: "tblVariant",
                column: "ProductId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryOptions");

            migrationBuilder.DropTable(
                name: "tblOptionCategory");

            migrationBuilder.DropTable(
                name: "tblVariant");

            migrationBuilder.DropTable(
                name: "tblOptions");
        }
    }
}
