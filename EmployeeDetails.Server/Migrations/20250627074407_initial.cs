using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EmployeeDetails.Server.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    position = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    employeeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    fName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dateOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    contactNumber = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dateHired = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    salary = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Positions",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    position = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    positionId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Positions", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "id", "address", "contactNumber", "dateHired", "dateOfBirth", "email", "employeeId", "fName", "gender", "lName", "mName", "position", "salary", "status" },
                values: new object[,]
                {
                    { 1, "123 Main St", "09121234567", "2022-01-01", "2000-01-01", "t9o1oooooo@example.com", "IT-0001", "John", "M", "Doe", "Doe", "IT", 50000, "Active" },
                    { 2, "123 Main St", "09121234562", "2022-01-01", "2000-01-01", "t9o1oooo@example.com", "HR-0001", "Jane", "F", "Doe", "Doe", "HR", 50000, "Active" },
                    { 3, "123 Main St", "09121234565", "2022-01-01", "2000-01-01", "t9o1oooexample.com", "EE-0001", "John", "M", "Doe", "Doe", "EE", 50000, "Active" }
                });

            migrationBuilder.InsertData(
                table: "Positions",
                columns: new[] { "id", "position", "positionId" },
                values: new object[,]
                {
                    { 1, "Information Technology", "IT" },
                    { 2, "Human Resource", "HR" },
                    { 3, "Electrical Engineer", "EE" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_contactNumber",
                table: "Employees",
                column: "contactNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_email",
                table: "Employees",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_employeeId",
                table: "Employees",
                column: "employeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Positions_position",
                table: "Positions",
                column: "position",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Positions_positionId",
                table: "Positions",
                column: "positionId",
                unique: true);

            migrationBuilder.Sql(@"
                CREATE PROCEDURE InsertPosition
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
            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Positions");

            migrationBuilder.Sql("DROP PROCEDURE InsertPosition");
        }
    }
}
