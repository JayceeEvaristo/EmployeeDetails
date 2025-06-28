using EmployeeDetails.Server.Data;
using EmployeeManagement.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDetails.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees() => Ok(await _context.Employees.OrderBy(e => e.employeeId).ToListAsync());

        [HttpGet("getEmployeeLastId/{positionId}")]
        public async Task<IActionResult> GetEmployeeLastId([FromRoute] string positionId)
        {
            var employees = await _context.Employees
            .Where(e => e.employeeId.Contains(positionId))
            .OrderByDescending(e => e.employeeId)
            .ToListAsync();

            return Ok(employees);
        }

        [HttpGet("{id}")] 
        public async Task<IActionResult> GetEmployee([FromRoute] int id) => Ok(await _context.Employees.FindAsync(id));

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAllEmployees), employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee([FromBody] Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAllEmployees), new { id = employee.id }, employee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAllEmployees), new { id = employee.id }, employee);
        }
    }
}
