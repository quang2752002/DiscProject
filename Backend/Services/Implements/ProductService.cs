using DiscApi.Base;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Repositories.Interfaces;
using DiscApi.Services.Interfaces;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DiscApi.Services.Implements
{
    public class ProductService : IProductService
    {
        private readonly IBaseRepository<Product> _baseRepository;
        private readonly ILogger<Product> _productLogger;
        private readonly IProductRepository _productRepository;

        public ProductService(IBaseRepository<Product> baseRepository, ILogger<Product> productLogger, IProductRepository productRepository)
        {
            _baseRepository = baseRepository;
            _productLogger = productLogger;
            _productRepository = productRepository;
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            
                return await _baseRepository.GetByIdAsync(id);
           
        }

        public async Task<List<Product>> GetAllAsync()
        {
            
                var products = await _baseRepository.GetAllAsync();
                return products.ToList();
           
        }

        public async Task<bool> AddAsync(ProductDTO entity)
        {
           
                var item = new Product
                {
                    Name = entity.Name,
                    Description = entity.Description,
                    CategoryId = entity.CategoryId,
                    Price = entity.Price,
                    Quantity = entity.Quantity,
                    Author = entity.Author,
                    IsActive = entity.IsActive
                };

                var result = await _baseRepository.AddAsync(item);
                return result != null;
           
        }

        public async Task<bool> UpdateAsync(ProductDTO entity)
        {
           
                var item = await _baseRepository.GetByIdAsync(entity.Id);
                if (item == null)
                {
                    return false;
                }

                item.Name = entity.Name;
                item.Description = entity.Description;
                item.CategoryId = entity.CategoryId;
                item.Price = entity.Price;
                item.Quantity = entity.Quantity;
                item.Author = entity.Author;
                item.IsActive = entity.IsActive;

                var result = await _baseRepository.UpdateAsync(item);
                return result != null;
           
        }

        public async Task<bool> RemoveAsync(int id)
        {
            
                var product = await GetByIdAsync(id);
                if (product == null)
                {
                    return false;
                }

                var result = await _baseRepository.RemoveAsync(product);
                return result != null;
           
        }

        public async Task<List<Product>> SearchAsync(Expression<Func<Product, bool>> predicate)
        {
            
                var result = await _baseRepository.SearchAsync(predicate);
                return result.ToList();
           
        }

        public async Task<(List<ProductDTOResponse> Products, int Total)> ShowListAsync(
                                                                         string name ,
                                                                         int idType ,
                                                                         int idCategory ,
                                                                         int index ,
                                                                         int size )
        {
            
                // Retrieve results from the repository
                var result = await _productRepository.ShowListAsync(name, idType, idCategory, index, size);
                return result;
           
        }
        public async Task<List<ProductDTOResponse>> GetProductDetail(int id)
        {
            
                var product = _productRepository.GetProductDetail(id);
                return product;
          

        }
        public async Task<List<ProductDTOResponse>> getProductNew(int index, int size)
        {
            var query=await _productRepository.getProductNew( index,  size);
            return query;

        }

        public async Task<List<ProductDTOResponse>> getProductBestSelling(int index , int size )
        {
            var query=await _productRepository.getProductBestSelling(index,size);
            return query;
        }
    }
}
