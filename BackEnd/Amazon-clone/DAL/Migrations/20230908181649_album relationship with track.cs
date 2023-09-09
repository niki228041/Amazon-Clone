using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class albumrelationshipwithtrack : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblTrack_tblAlbum_AlbumId",
                table: "tblTrack");

            migrationBuilder.DropIndex(
                name: "IX_tblTrack_AlbumId",
                table: "tblTrack");

            migrationBuilder.DropColumn(
                name: "AlbumId",
                table: "tblTrack");

            migrationBuilder.CreateTable(
                name: "TrackAlbum",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrackId = table.Column<int>(type: "int", nullable: true),
                    AlbumId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDelete = table.Column<bool>(type: "bit", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackAlbum", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrackAlbum_tblAlbum_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "tblAlbum",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrackAlbum_tblTrack_TrackId",
                        column: x => x.TrackId,
                        principalTable: "tblTrack",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrackAlbum_AlbumId",
                table: "TrackAlbum",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackAlbum_TrackId",
                table: "TrackAlbum",
                column: "TrackId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrackAlbum");

            migrationBuilder.AddColumn<int>(
                name: "AlbumId",
                table: "tblTrack",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblTrack_AlbumId",
                table: "tblTrack",
                column: "AlbumId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblTrack_tblAlbum_AlbumId",
                table: "tblTrack",
                column: "AlbumId",
                principalTable: "tblAlbum",
                principalColumn: "Id");
        }
    }
}
