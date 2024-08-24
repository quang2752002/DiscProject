using DiscApi.Constant;
using DiscApi.Extensions;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Services.Implements;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;


namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "ADMIN")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ILogger<Order> _logger;

        public OrderController(IOrderService orderService, ILogger<Order> logger)
        {
            _orderService = orderService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders(DateTime? fromDate = null, DateTime? toDate = null, string searchString = "", int page = 1, int size = 10)
        {
            try
            {
                var orders = await _orderService.GetAllOrderAsync(fromDate, toDate, searchString, page, size);
                _logger.LogInformation("Get all orders successfully");
                return Ok(orders);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPatch("change-transaction/{id}")]
        public async Task<IActionResult> ChangeTransaction([FromRoute] int id, [FromBody] OrderReqDTO reqBody)
        {
            try
            {
                var changeResult = await _orderService.ChangeTransactionAsync(id, reqBody.TransactionCode);
                _logger.LogInformation("Change order transition successfully");
                return Ok(changeResult);
            }
            catch (CustomException e)
            {
                _logger.LogError(e.Message);
                return BadRequest(new Response(400, e.Message));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, e.Message));
            }
        }


        [HttpPatch("change-status/{id}")]
        public async Task<IActionResult> ChangeStatus([FromRoute] int id)
        {
            try
            {
                var changeResult = await _orderService.ChangeStatusAsync(id);
                _logger.LogInformation("Change order status successfully");
                return Ok(changeResult);
            }
            catch (CustomException e)
            {
                _logger.LogError(e.Message);
                return BadRequest(new Response(400, e.Message));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, e.Message));
            }
        }
    }
}
