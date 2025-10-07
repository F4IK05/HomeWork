using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddOAuth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserOAuth_Users_UserId",
                table: "UserOAuth");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserOAuth",
                table: "UserOAuth");

            migrationBuilder.RenameTable(
                name: "UserOAuth",
                newName: "UserOAuths");

            migrationBuilder.RenameIndex(
                name: "IX_UserOAuth_UserId",
                table: "UserOAuths",
                newName: "IX_UserOAuths_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserOAuths",
                table: "UserOAuths",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserOAuths_Users_UserId",
                table: "UserOAuths",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserOAuths_Users_UserId",
                table: "UserOAuths");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserOAuths",
                table: "UserOAuths");

            migrationBuilder.RenameTable(
                name: "UserOAuths",
                newName: "UserOAuth");

            migrationBuilder.RenameIndex(
                name: "IX_UserOAuths_UserId",
                table: "UserOAuth",
                newName: "IX_UserOAuth_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserOAuth",
                table: "UserOAuth",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserOAuth_Users_UserId",
                table: "UserOAuth",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
