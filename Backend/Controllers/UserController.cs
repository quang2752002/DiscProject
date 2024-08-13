using DiscApi.Constant;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<User> _logger;

        public UserController(IUserService userService, ILogger<User> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Register([FromBody]RegisterDTO form)
        {
            try
            {
                var addResult = await _userService.CreateAccount(form, RoleName.CUSTOMER);
                _logger.LogInformation("Register new account successfully");
                return Ok(addResult);
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest(e.Message);
            }         
        }

        [HttpPost("login")]
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
