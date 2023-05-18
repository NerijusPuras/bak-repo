using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class AddLectureEntryScoreTableFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasExpertBadge",
                table: "LectureEntryScores",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasKnowledgeSharingBadge",
                table: "LectureEntryScores",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasExpertBadge",
                table: "LectureEntryScores");

            migrationBuilder.DropColumn(
                name: "HasKnowledgeSharingBadge",
                table: "LectureEntryScores");
        }
    }
}
