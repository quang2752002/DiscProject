using DiscApi.Extensions;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Threading.Tasks;

namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "ADMIN")]

    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll(string searchString = "", int categoryId = 0, int page = 1, int size = 10)
        {
            try
            {
                var result = await _productService.GetAllProductsAsync(searchString, categoryId, page, size);
                return Ok(result);
            } catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProductById([FromRoute] int id)
        {
            try
            {
                var result = await _productService.GetProductById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddProduct([FromForm] AddProductDTO form)
        {
            try
            {
                var addResult = await _productService.AddProductAsync(form);
                return Ok(addResult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("update")]
        public async Task<IActionResult> UpdateProduct([FromForm] UpdateProductDTO form)
        {
            try
            {
                var update = await _productService.UpdateProductAsync(form);
                return Ok(update);
            } 
            catch (CustomException ex)
            {
                return BadRequest(new Response(400, ex.Message));
            } 
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }

        }

        [HttpPatch("status/{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id)
        {
            try
            {
                var toggleResult = await _productService.ToggleProductStatus(id);
                return Ok(new Response(200,$"The status of product with id = {id} has changed, current status: {toggleResult}"));
            }
            catch (CustomException ex)
            {
                return BadRequest(new Response(400, ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response(500, ex.Message));
            }
        }
    }
}
