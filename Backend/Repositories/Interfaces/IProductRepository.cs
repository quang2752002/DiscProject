using DiscApi.Models.Entities;

namespace DiscApi.Repositories.Interfaces
{
    public interface IProductRepository
    {
        public Task<List<Product>> GetAllAsync(string searchString = "", int categoryId = 0, int page = 1, int size = 10);
    }
}
