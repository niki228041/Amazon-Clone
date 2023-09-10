using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class AddedCategoryImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryImageId",
                table: "tblCategories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tblCategoryImages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblCategoryImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblCategoryImages_tblCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "tblCategories",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblCategories_CategoryImageId",
                table: "tblCategories",
                column: "CategoryImageId");

            migrationBuilder.CreateIndex(
                name: "IX_tblCategoryImages_CategoryId",
                table: "tblCategoryImages",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblCategories_tblCategoryImages_CategoryImageId",
                table: "tblCategories",
                column: "CategoryImageId",
                principalTable: "tblCategoryImages",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblCategories_tblCategoryImages_CategoryImageId",
                table: "tblCategories");

            migrationBuilder.DropTable(
                name: "tblCategoryImages");

            migrationBuilder.DropIndex(
                name: "IX_tblCategories_CategoryImageId",
                table: "tblCategories");

            migrationBuilder.DropColumn(
                name: "CategoryImageId",
                table: "tblCategories");
        }
    }
}
