using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class ChangeContributionValidationTableFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LectureId",
                table: "ContributionValidation",
                newName: "ContributionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContributionId",
                table: "ContributionValidation",
                newName: "LectureId");
        }
    }
}
