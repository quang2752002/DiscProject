using DiscApi.Constant;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "ADMIN")]

    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly ILogger<IdentityRole<int>> _logger;

        public RoleController(IRoleService roleService, ILogger<IdentityRole<int>> logger)
        {
            _roleService = roleService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRoles()
        {
            try
            {
                var res = await _roleService.GetAllRolesAsync();
                return Ok(res);
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, e.Message));
            }         
        }

       

    }
}
