using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DiscApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: api/<ProductController>
        [HttpGet]

        public async Task<IActionResult> Get( string name = "", int idType = 0,int idCategory = 0,int index=1, int size = 9)
        {
            var result = await _productService.ShowListAsync(name, idType, idCategory, index, size);

            var data = new
            {
                Products = result.Products,
                Total = result.Total,
            };

            return Ok(data);
        }


        // GET api/<ProductController>/get/5
        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _productService.GetProductDetail(id);
            if (product == null)

                return NotFound();

            return Ok(product);
        }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ProductDTO product)
        {
            var addResult = await _productService.AddAsync(product);
            if (!addResult)
                return BadRequest("Unable to add product");
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] ProductDTO product)
        {
            var updateResult = await _productService.UpdateAsync(product);
            if (!updateResult)
                return BadRequest("Unable to update product");
            return NoContent();
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var rs = await _productService.RemoveAsync(id);
            if (!rs)
                return BadRequest("Unable to delete product");
            return NoContent();
        }
    }
}
