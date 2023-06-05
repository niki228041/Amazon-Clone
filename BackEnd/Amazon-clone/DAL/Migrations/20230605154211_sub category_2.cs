using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DAL.Migrations
{
    public partial class subcategory_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subcategories_tblCategories_Id",
                table: "Subcategories");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "tblCategories",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Subcategories",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.CreateIndex(
                name: "IX_tblCategories_CategoryId",
                table: "tblCategories",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Subcategories_CategoryId",
                table: "Subcategories",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategories_Subcategories_CategoryId",
                table: "Subcategories",
                column: "CategoryId",
                principalTable: "Subcategories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblCategories_tblCategories_CategoryId",
                table: "tblCategories",
                column: "CategoryId",
                principalTable: "tblCategories",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Subcategories_Subcategories_CategoryId",
                table: "Subcategories");

            migrationBuilder.DropForeignKey(
                name: "FK_tblCategories_tblCategories_CategoryId",
                table: "tblCategories");

            migrationBuilder.DropIndex(
                name: "IX_tblCategories_CategoryId",
                table: "tblCategories");

            migrationBuilder.DropIndex(
                name: "IX_Subcategories_CategoryId",
                table: "Subcategories");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "tblCategories");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Subcategories",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategories_tblCategories_Id",
                table: "Subcategories",
                column: "Id",
                principalTable: "tblCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
