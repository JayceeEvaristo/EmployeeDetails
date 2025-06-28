using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeDetails.Server.Migrations
{
    /// <inheritdoc />
    public partial class editSp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                CREATE PROCEDURE InsertPositions
                @position nvarchar(450),
                @positionId nvarchar(450)
                AS
                BEGIN
                    INSERT INTO Positions (position, positionId)
                    VALUES (@position, @positionId)
                END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROCEDURE InsertPositions");
        }
    }
}
