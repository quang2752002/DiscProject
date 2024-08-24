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

    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly ILogger<Category> _logger;

        public CategoryController(ICategoryService categoryService, ILogger<Category> logger)
        {
            _categoryService = categoryService;
            _logger = logger;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllCategories(string searchString = "", int page = 1, int size =10)
        {
            try
            {
                var categories = await _categoryService.GetAllCategories(searchString, page, size);
                _logger.LogInformation("Get all categories successfully");
                return Ok(categories);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, e.Message));
            }
        }

        [HttpPost("Add")]
        public async Task<IActionResult> CreateCategory([FromForm] CategoryReqDTO form)
        {
            try
            {
                var addResult = await _categoryService.CreateCategoryAsync(form);
                _logger.LogInformation("Create new cateogry successfully");
                return Ok(addResult);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, e.Message));
            }
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> CreateCategory([FromRoute] int id, [FromForm] CategoryReqDTO form)
        {
            try
            {
                var updateResult = await _categoryService.UpdateCategoryAsync(id, form);
                _logger.LogInformation("Update cateogry successfully");
                return Ok(updateResult);
            }
            catch(CustomException ex)
            {
                return BadRequest(new Response(400, ex.Message));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, e.Message));
            }
        }

        [HttpPatch("toggle-status/{id}")]
        public async Task<IActionResult> ToggleCategoryStatus([FromRoute] int id)
        {
            try
            {
                var toggleResult = await _categoryService.ToggleStatusCategoryAsync(id);
                _logger.LogInformation("Change cateogry status successfully");
                return Ok(new Response(200, $"Change cateogry status successfully, current status: {toggleResult.IsActive}"));
            }
            catch (CustomException ex)
            {
                return BadRequest(new Response(400, ex.Message));
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, e.Message));
            }
        }
    }
}
