using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Repositories.Interfaces;
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
        private readonly IOrderItemService _orderItemService;
        private IProductRepository _productRepository;

        public ProductController(IProductService productService, IOrderItemService orderItemService, IProductRepository productRepository)
        {
            _productService = productService;
            _orderItemService = orderItemService;
            _productRepository = productRepository;
        }


        // GET: api/<ProductController>
        [HttpGet]

        public async Task<IActionResult> Get(string name = "", int idType = 0,int idCategory = 0,int index=1, int size = 9)
        {          
            try
            {
                var result = await _productService.ShowListAsync(name, idType, idCategory, index, size);

                var data = new
                {
                    Products = result.Products,
                    Total = result.Total,
                };
                if(data==null)
                    return NotFound();
                return Ok(data);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getList")]
        public async Task<IActionResult> getList()
        {
            try
            {
                var query = await _productRepository.getList();               
                if(query==null) 
                    return NotFound();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        // GET api/<ProductController>/get/5
        [HttpGet("get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var product = await _productService.GetProductDetail(id);
                if (product == null)
                    return NotFound();
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }

        // POST api/<ProductController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ProductDTO product)
        {
            try
            {
                var addResult = await _productService.AddAsync(product);
                if (!addResult)
                    return BadRequest("Unable to add product");
                return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }        
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] ProductDTO product)
        {
            try
            {
                var updateResult = await _productService.UpdateAsync(product);
                if (!updateResult)
                    return BadRequest("Unable to update product");
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var rs = await _productService.RemoveAsync(id);
                if (!rs)
                    return BadRequest("Unable to delete product");
                return Ok();
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("getReview")]
        public async Task<IActionResult> getReview(int id,  int page = 1,  int size = 5)
        {
            try
            {
                var result = await _orderItemService.GetReviews(id, page, size);
                var response = new
                {
                    Review = result.Review,
                    Total = result.Total,
                };
                if (result.Review == null)
                    return NotFound();
                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getProductNew")]
        public async Task<IActionResult> getProductNew(int index = 1, int size = 3)
        {
            try
            {
               var result = await _productService.getProductNew(index,size);
               var data = new
                {
                    Products = result,
                    Total = 9,
                };
                return Ok(data);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getProductBestSelling")]
        public async Task<IActionResult> getProductBestSelling(int index=1,int size=3)
        {
            try
            {
                var result = await _productService.getProductBestSelling(index,size);
                var data = new
                {
                    Products = result,
                    Total = 9,
                };
                return Ok(data);
            }
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
