using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Bif4.Schiermayer.MyApp.Migrations
{
    public partial class CreateSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lehrveranstaltungen",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Abbreviation = table.Column<string>(nullable: true),
                    ECTS = table.Column<int>(nullable: false),
                    Exam = table.Column<string>(nullable: true),
                    Fullname = table.Column<string>(nullable: true),
                    Lector = table.Column<string>(nullable: true),
                    Moodle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lehrveranstaltungen", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lehrveranstaltungen");
        }
    }
}
