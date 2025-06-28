using EmployeeDetails.Server.Data;
using EmployeeManagement.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDetails.Server.Controllers
{
    [Route("api/[controller]")]
    public class PositionsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PositionsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAllPositions() => Ok(await _context.Positions.ToListAsync());

    }
}
