using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class optionsrelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblVariant_tblOptions_OptionsId",
                table: "tblVariant");

            migrationBuilder.AddForeignKey(
                name: "FK_tblVariant_tblOptions_OptionsId",
                table: "tblVariant",
                column: "OptionsId",
                principalTable: "tblOptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblVariant_tblOptions_OptionsId",
                table: "tblVariant");

            migrationBuilder.AddForeignKey(
                name: "FK_tblVariant_tblOptions_OptionsId",
                table: "tblVariant",
                column: "OptionsId",
                principalTable: "tblOptions",
                principalColumn: "Id");
        }
    }
}
