using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Bif4.Schiermayer.MyApp.Migrations
{
    public partial class AddUserProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "Lehrveranstaltungen",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Lehrveranstaltungen",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserSubject",
                table: "Lehrveranstaltungen",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "Lehrveranstaltungen");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Lehrveranstaltungen");

            migrationBuilder.DropColumn(
                name: "UserSubject",
                table: "Lehrveranstaltungen");
        }
    }
}
