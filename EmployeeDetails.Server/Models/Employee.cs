namespace EmployeeManagement.Server.Models
{
    public class Employee
    {
        public int id { get; set; }
        public string position { get; set; }
        public string employeeId { get; set; }
        public string fName { get; set; }
        public string lName { get; set; }
        public string? mName { get; set; }
        public string dateOfBirth { get; set; }
        public string gender { get; set; }
        public string contactNumber { get; set; }
        public string email { get; set; }
        public string address { get; set; }
        public string dateHired { get; set; }
        public string status { get; set; }
        public int salary { get; set; }
    }
}
