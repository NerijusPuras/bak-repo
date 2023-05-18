using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class AddLectureEntryScoreTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Slides_Lectures_LectureId",
                table: "Slides");

            migrationBuilder.AlterColumn<Guid>(
                name: "LectureId",
                table: "Slides",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "LectureEntryScores",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    PlayerName = table.Column<string>(type: "TEXT", nullable: true),
                    CorrectAnswers = table.Column<int>(type: "INTEGER", nullable: false),
                    TotalQuestions = table.Column<int>(type: "INTEGER", nullable: false),
                    TotalScore = table.Column<int>(type: "INTEGER", nullable: false),
                    LectureId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LectureEntryScores", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Slides_Lectures_LectureId",
                table: "Slides",
                column: "LectureId",
                principalTable: "Lectures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Slides_Lectures_LectureId",
                table: "Slides");

            migrationBuilder.DropTable(
                name: "LectureEntryScores");

            migrationBuilder.AlterColumn<Guid>(
                name: "LectureId",
                table: "Slides",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_Slides_Lectures_LectureId",
                table: "Slides",
                column: "LectureId",
                principalTable: "Lectures",
                principalColumn: "Id");
        }
    }
}
