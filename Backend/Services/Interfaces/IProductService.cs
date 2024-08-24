using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;

namespace DiscApi.Services.Interfaces
{
    public interface IProductService
    {
        public Task<ResponseData<ProductResDTO>> GetAllProductsAsync(string searchString = "", int categoryId = 0, int page = 1, int size = 10);
        public Task<Product> GetProductById(int id);
        public Task<Product> AddProductAsync(AddProductDTO form);
        public Task<Product> UpdateProductAsync(UpdateProductDTO form);
        public Task<bool> ToggleProductStatus(int id);
    }
}
