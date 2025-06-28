using EmployeeManagement.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDetails.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Positions> Positions { get; set; }
        public DbSet<Employee> Employees { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //position
            modelBuilder.Entity<Positions>()
                .HasIndex(e => e.position)
                .IsUnique();

            modelBuilder.Entity<Positions>()
                .HasIndex(e => e.positionId)
                .IsUnique();

           modelBuilder.Entity<Positions>().HasData(
               new Positions { id = 1, position = "Information Technology", positionId = "IT" },
               new Positions { id = 2, position = "Human Resource", positionId = "HR" },
               new Positions { id = 3, position = "Electrical Engineer", positionId = "EE" }
               );

            //Employee
            modelBuilder.Entity<Employee>().HasIndex(e => e.contactNumber).IsUnique();
            modelBuilder.Entity<Employee>().HasIndex(e => e.email).IsUnique();
            modelBuilder.Entity<Employee>().HasIndex(e => e.employeeId).IsUnique();

            modelBuilder.Entity<Employee>().HasData(
                new Employee {
                    id = 1,
                    position = "IT",
                    employeeId = "IT-0001",
                    fName = "John",
                    lName = "Doe",
                    mName = "Doe",
                    contactNumber = "09121234567",
                    dateOfBirth = "2000-01-01",
                    gender = "M",
                    email = "t9o1oooooo@example.com",
                    address = "123 Main St",
                    dateHired = "2022-01-01",
                    status = "Active",
                    salary = 50000
                },
                new Employee {
                    id = 2,
                    position = "HR",
                    employeeId = "HR-0001",
                    fName = "Jane",
                    lName = "Doe",
                    mName = "Doe",
                    contactNumber = "09121234562",
                    dateOfBirth = "2000-01-01",
                    gender = "F",
                    email = "t9o1oooo@example.com",
                    address = "123 Main St",
                    dateHired = "2022-01-01",
                    status = "Active",
                    salary = 50000
                },
                new Employee {
                    id = 3,
                    position = "EE",
                    employeeId = "EE-0001",
                    fName = "John",
                    lName = "Doe",
                    mName = "Doe",
                    contactNumber = "09121234565",
                    dateOfBirth = "2000-01-01",
                    gender = "M",
                    email = "t9o1oooexample.com",
                    address = "123 Main St",
                    dateHired = "2022-01-01",
                    status = "Active",
                    salary = 50000
                }
            );
        }
        
    }
}
