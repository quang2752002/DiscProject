using DiscApi.Constant;
using DiscApi.Extensions;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "ADMIN")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<User> _logger;

        public UserController(IUserService userService, ILogger<User> logger)
        {
            _userService = userService;
            _logger = logger;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllUsers(string searchString = "", int page = 1, int size = 10)
        {
            try
            {
                var res = await _userService.GetAllUsersAsync(searchString, page, size);
                return Ok(res);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, e.Message));
            }
        }


        [HttpPost("add")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] AddUserReqDTO form)
        {
            try
            {
                var addResult = await _userService.CreateAccount(form, RoleName.CUSTOMER);
                _logger.LogInformation("Register new account successfully");
                return Ok(addResult);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest(e.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAccount([FromForm] AddUserReqDTO form)
        {
            try
            {
                var createResult = await _userService.CreateAccount(form, form.RoleId == 1 ? RoleName.CUSTOMER : RoleName.ADMIN);
                _logger.LogInformation("Create new account successfully");
                return Ok(createResult);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest(e.Message);
            }
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateAccount([FromRoute] int id, [FromForm] UpdateUserReqDTO form)
        {
            try
            {
                var updateResult = await _userService.UpdateAccountAsync(form, id);
                return Ok(updateResult);
            }
            catch (CustomException ex)
            {
                return BadRequest(new Response(ex.StatusCode, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }
        [HttpPatch("change-role/{id}")]
        public async Task<IActionResult> ChangeRole([FromRoute] int id, [FromBody] ChangeRoleDTO form)
        {
            try
            {
                var changeRoleResult = await _userService.ChangeRoleAsync(id, form.RoleId);
                return Ok(changeRoleResult);
            }
            catch (CustomException ex)
            {
                return BadRequest(new Response(ex.StatusCode, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }

        }

        [HttpPatch("toggle-status/{id}")]
        public async Task<IActionResult> ToggleStatus([FromRoute] int id)
        {
            try
            {
                var toggleStatusResult = await _userService.ToggleUserStatusAsync(id);
                return Ok(toggleStatusResult);
            }
            catch (CustomException ex)
            {
                return BadRequest(new Response(ex.StatusCode, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDTO form)
        {
            try
            {
                var loginResult = await _userService.Login(form);
                _logger.LogInformation("Login successfully");
                return Ok(loginResult);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest(e.Message);
            }
        }

    }
}
