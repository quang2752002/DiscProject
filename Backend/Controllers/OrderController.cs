using DiscApi.Models.DTOs.Requests;
using DiscApi.Services.Implements;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IUserService _userService;

        public OrderController(IOrderService orderService, IUserService userService)
        {
            _orderService = orderService;
            _userService = userService;
        }





        // GET: api/<OrderController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<OrderController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        [HttpPost("CheckOut")]
        [Authorize]
        public async Task<IActionResult> CheckOut([FromForm] CheckOutDTO checkOutDTO)
        {
            try
            {
                if (checkOutDTO == null)
                {
                    return BadRequest("Invalid checkout data.");
                }
                var username = User.FindFirst(ClaimTypes.Name)?.Value;
                int userId = await _userService.getUserId(username);

                if (userId != 0)
                {
                    await _orderService.Order(checkOutDTO, userId);
                    return Ok();
                }

                else
                {
                    return Unauthorized();
                }
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

