using DiscApi.Services.Implements;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeController : ControllerBase
    {
        private readonly ITypeService typeService;

        public TypeController(ITypeService typeService)
        {
            this.typeService = typeService;
        }

        [HttpGet("getList")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var categories = await typeService.getList();
                if (categories == null || !categories.Any())
                {
                    return NotFound();
                }

                return Ok(categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
