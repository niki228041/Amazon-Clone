using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class add_parent_to_category : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblCategories_tblCategories_CategoryId",
                table: "tblCategories");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "tblCategories",
                newName: "ParentId");

            migrationBuilder.RenameIndex(
                name: "IX_tblCategories_CategoryId",
                table: "tblCategories",
                newName: "IX_tblCategories_ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblCategories_tblCategories_ParentId",
                table: "tblCategories",
                column: "ParentId",
                principalTable: "tblCategories",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblCategories_tblCategories_ParentId",
                table: "tblCategories");

            migrationBuilder.RenameColumn(
                name: "ParentId",
                table: "tblCategories",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_tblCategories_ParentId",
                table: "tblCategories",
                newName: "IX_tblCategories_CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblCategories_tblCategories_CategoryId",
                table: "tblCategories",
                column: "CategoryId",
                principalTable: "tblCategories",
                principalColumn: "Id");
        }
    }
}
