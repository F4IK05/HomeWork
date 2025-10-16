using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MusicApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCoverToSongs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CoverUrl",
                table: "Songs",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverUrl",
                table: "Songs");
        }
    }
}
