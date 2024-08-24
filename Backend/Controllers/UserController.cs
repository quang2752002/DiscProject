using AutoMapper;
using DiscApi.Constant;
using DiscApi.Extensions;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.Intrinsics.Arm;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<User> _logger;
        private readonly JwtSettings _jwtSetting;

        public UserController(IUserService userService, ILogger<User> logger, JwtSettings jwtSetting)
        {
            _userService = userService;
            _logger = logger;
            _jwtSetting = jwtSetting;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO form)
        {
            try
            {
                var addResult = await _userService.SignUp(form);
                _logger.LogInformation("Register new account successfully");
                return Ok(addResult);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest(e.Message);
            }
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                // Validate user credentials (replace with real validation)
                if (await _userService.SignIn(request.Username, request.Password))
                {
                    var claims = new[]
                    {
                    new Claim(ClaimTypes.Name, request.Username),
                    new Claim(JwtRegisteredClaimNames.Sub,request.Username),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),

              };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSetting.Secretkey));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                              issuer: _jwtSetting.Issuer,
                              audience: _jwtSetting.Audience,
                              claims: claims,
                              expires: DateTime.UtcNow.AddDays(_jwtSetting.ExpiryMinutes),
                              signingCredentials: creds
                        );

                    return Ok(new
                    {
                        Token = new JwtSecurityTokenHandler().WriteToken(token),
                        Role = "Customer",
                    });
                }

                return Unauthorized();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getUser")]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                // Extract username from claims
                var username = User.FindFirst(ClaimTypes.Name)?.Value;

                if (string.IsNullOrEmpty(username))
                {
                    // If username is not found in claims, return unauthorized
                    return Unauthorized("User is not authenticated.");
                }

                // Fetch user ID
                int userId = await _userService.getUserId(username);

                // Fetch user details
                var user = await _userService.getUser(userId);

                if (user == null)
                {
                    // If user not found, return not found status
                    return NotFound("User not found.");
                }


                // Return user details
                return Ok(user);
            }
            catch (Exception ex)
            {
                // Log the exception details for troubleshooting
                _logger.LogError(ex, "An error occurred while fetching user details.");

                // Return a generic error response
                return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }
        }



    }
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
