using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class trackdeletefix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblTrackGenre_tblGenre_GenreId",
                table: "tblTrackGenre");

            migrationBuilder.DropForeignKey(
                name: "FK_tblTrackGenre_tblTrack_TrackId",
                table: "tblTrackGenre");

            migrationBuilder.AddForeignKey(
                name: "FK_tblTrackGenre_tblGenre_GenreId",
                table: "tblTrackGenre",
                column: "GenreId",
                principalTable: "tblGenre",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tblTrackGenre_tblTrack_TrackId",
                table: "tblTrackGenre",
                column: "TrackId",
                principalTable: "tblTrack",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblTrackGenre_tblGenre_GenreId",
                table: "tblTrackGenre");

            migrationBuilder.DropForeignKey(
                name: "FK_tblTrackGenre_tblTrack_TrackId",
                table: "tblTrackGenre");

            migrationBuilder.AddForeignKey(
                name: "FK_tblTrackGenre_tblGenre_GenreId",
                table: "tblTrackGenre",
                column: "GenreId",
                principalTable: "tblGenre",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_tblTrackGenre_tblTrack_TrackId",
                table: "tblTrackGenre",
                column: "TrackId",
                principalTable: "tblTrack",
                principalColumn: "Id");
        }
    }
}
