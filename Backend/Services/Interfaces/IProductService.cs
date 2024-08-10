using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using System.Linq.Expressions;

namespace DiscApi.Services.Interfaces
{
    public interface IProductService
    {
        public Task<Product> GetByIdAsync(int id);
        public Task<List<Product>> GetAllAsync();
        public Task<bool> AddAsync(ProductDTO entity);
        public Task<bool> UpdateAsync(ProductDTO entity);
        public Task<bool> RemoveAsync(int id);
        public Task<List<Product>> SearchAsync(Expression<Func<Product, bool>> predicate);
        public Task<(List<ProductDTORespone> Products, int Total)> ShowListAsync(string name , int idType , int idCategory , int index, int size );

        public Task<List<ProductDTORespone>> GetProductDetail(int id);

    }
}
