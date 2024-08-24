using DiscApi.Models.DTOs.Requests;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IOrderItemService _orderItemService;

        public OrderItemController(IUserService userService, IOrderItemService orderItemService)
        {
            _userService = userService;
            _orderItemService = orderItemService;
        }



        // GET: api/<OrderItemController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<OrderItemController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<OrderItemController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<OrderItemController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrderItemController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }


        [HttpGet("GetOrderHistory")]
        [Authorize]
        public async Task<IActionResult> GetOrderHistory()
        {
            try
            {
                var username = User.FindFirst(ClaimTypes.Name)?.Value;
                int userId = await _userService.getUserId(username);
                if (userId != 0)
                {
                    var query = await _orderItemService.GetOrderHistory(userId);

                    if (query != null)
                    {
                        return Ok(query);
                    }
                    else
                    {
                        return NotFound();
                    }
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
        [HttpPost("Feedback")]
        [Authorize]
        public async Task<IActionResult> Feedback(OrderItemDTO orderItemDTO)
        {
            try
            {
                if (await _orderItemService.FeedBack(orderItemDTO))
                    return Ok();
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
