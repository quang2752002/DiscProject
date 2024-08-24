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
    public class TypeController : ControllerBase
    {
        private readonly ITypeService _typeService;
        private readonly ILogger<Models.Entities.Type> _logger;

        public TypeController(ITypeService typeService, ILogger<Models.Entities.Type> logger)
        {
            _typeService = typeService;
            _logger = logger;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllTypes(string searchString = "", int page = 1, int size = 10)
        {
            try
            {
                var types = await _typeService.GetAllTypesAsync(searchString, page, size);
                _logger.LogInformation("Get all types successfully");
                return Ok(types);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPost("Add")]
        public async Task<IActionResult> CreateType([FromForm]TypeReqDTO form)
        {
            try
            {
                var newType = await _typeService.CreateTypeAsync(form);
                _logger.LogInformation("Create new types successfully");
                return Ok(newType);
            }
            catch (CustomException ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new Response(400, ex.Message));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpPatch("Update/{id}")]
        public async Task<IActionResult> UpdateType([FromRoute] int id, [FromForm] TypeReqDTO form)
        {
            try
            {
                var updateType = await _typeService.UpdateTypeAsync(id, form);
                _logger.LogInformation("Update the type successfully");
                return Ok(updateType);
            }
            catch (CustomException ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new Response(400, ex.Message));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPatch("toggle-status/{id}")]
        public async Task<IActionResult> ToggleTypeStatus([FromRoute] int id)
        {
            try
            {
                var toggleResult = await _typeService.ToggleTypeStatusAsync(id);
                _logger.LogInformation("Update the type status successfully");
                return Ok(new Response(200, $"Update the type status successfully, current status: {toggleResult.IsActive}"));
            }
            catch (CustomException ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new Response(400, ex.Message));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

    }
}
