using DiscApi.Data;
using DiscApi.Models.Entities;
using DiscApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DiscApi.Repositories.Implements
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly DbSet<Product> _dbSet;

        public ProductRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Products;
        }

        public Task<List<Product>> GetAllAsync(string searchString = "", int categoryId = 0, int page = 1, int size = 10)
        {
            throw new NotImplementedException();
        }
    }
}
