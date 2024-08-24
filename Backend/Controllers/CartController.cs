using DiscApi.Constant;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.Entities;
using DiscApi.Services.Implements;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly IUserService _userService;

        public CartController(ICartService cartService, IUserService userService)
        {
            _cartService = cartService;
            _userService = userService;
        }

        [HttpGet("GetCart")]
        [Authorize]
        public async Task<IActionResult> GetCart()
        {
            try
            {
                var username = User.FindFirst(ClaimTypes.Name)?.Value;
                int userId = await _userService.getUserId(username);

                if (userId != 0)
                {
                    var query = await _cartService.getCart(userId);

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

        [HttpPost("AddCart")]
        [Authorize]
        public async Task<IActionResult> AddCart([FromForm] int productId, [FromForm] int quantity)
        {
            try
            {
                var username = User.FindFirst(ClaimTypes.Name)?.Value;
                int userId = await _userService.getUserId(username);

                if (userId != 0)
                {
                    var isCreate = await _cartService.InsertAsync(userId, productId, quantity);
                    if (isCreate)
                        return Ok(new { Message = "Product added to cart successfully." });
                    return BadRequest();
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

        [HttpPut("Update")]
        [Authorize]
        public async Task<IActionResult> Update(int id, int quantity) // Update cart
        {
            try
            {
                bool isUpdated = await _cartService.UpdateAsync(id, quantity);
                if (isUpdated)
                    return Ok(new { Message = "Product updated in cart successfully." });
                return BadRequest(new { Message = "Failed to update product in cart." });

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Delete/{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool isDelete = await _cartService.DeleteAsync(id);
                if (isDelete)
                    return Ok(new { Message = "Deleted" });
                return BadRequest(new { Message = "Failed to delete" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("UpdateQuantity")]
        [Authorize]
        public async Task<IActionResult> UpdateQuantity([FromBody] CartDTO request)
        {
            try
            {
                bool isUpdate = await _cartService.UpdateQuantity(request.Id, request.Quantity);
                if (isUpdate)
                    return Ok(new { Message = "Updated" });
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("getCheckOut")]
        [Authorize]
        public async Task<IActionResult> GetCheckOut([FromForm] int[] Id)
        {
            try
            {
                var query = await _cartService.GetCheckOut(Id);
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}


