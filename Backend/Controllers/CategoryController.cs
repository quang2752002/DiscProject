using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }
        // GET: api/<CategoryController>
        [HttpGet("getList")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var categories = await categoryService.getList();
                if (categories == null || !categories.Any())
                    return NotFound();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getCategoryByTypeId/{id}")]
        public async Task<IActionResult> getCategoryByTypeId(int id)
        {
            try
            {
                var query = await categoryService.getCategoryByTypeId(id);
                if (query == null)
                    return NotFound();
                return Ok(query);
            }
            catch (Exception ex)
            {
                {
                    return BadRequest(ex.Message);
                }
            }

        }
    }
}
