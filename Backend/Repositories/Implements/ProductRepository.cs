using DiscApi.Base;
using DiscApi.Data;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore; // Required for EF Core extensions

namespace DiscApi.Repositories.Implements
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(List<ProductDTOResponse> Products, int Total)> ShowListAsync(string name, int idType, int idCategory, int index, int size)
        {
            name = name ?? string.Empty;

            // Define the base query
            IQueryable<ProductDTOResponse> query = from a in _context.Products
                                                  join b in _context.Categories on a.CategoryId equals b.Id
                                                  join c in _context.CategoryTypes on b.Id equals c.CategoryId into categoryTypes
                                                  from ct in categoryTypes.DefaultIfEmpty()
                                                  where (idType <= 0 || (ct != null && ct.Id == idType)) &&
                                                        (idCategory <= 0 || a.CategoryId == idCategory)
                                                  select new ProductDTOResponse
                                                  {
                                                      Id = a.Id,
                                                      Name = a.Name,
                                                      Description = a.Description,
                                                      Author = a.Author,
                                                      CategoryId = a.CategoryId,
                                                      Price = a.Price,
                                                      Quantity = a.Quantity,
                                                      IsActive = a.IsActive,
                                                      Path = a.Attachments.Any() ? a.Attachments.FirstOrDefault().Path : null,

                                                  };

            // Filter by name if specified
            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(p => p.Name.Contains(name));
            }

            // Group by Id and aggregate fields
            var groupedQuery = query
                .GroupBy(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Author,
                    p.CategoryId,
                    p.Price,
                    p.IsActive,
                    p.Path,
                })
                .Select(g => new ProductDTOResponse
                {
                    Id = g.Key.Id,
                    Name = g.Key.Name,
                    Description = g.Key.Description,
                    Author = g.Key.Author,
                    CategoryId = g.Key.CategoryId,
                    Price = g.Key.Price,
                    Quantity = g.Sum(p => p.Quantity), // Aggregate quantity
                    IsActive = g.Key.IsActive,
                    Path=g.Key.Path,
                });

            // Count total number of products
            int total = await groupedQuery.CountAsync();

            // Apply pagination
            if (size > 0 && index > 0)
            {
                groupedQuery = groupedQuery.Skip((index - 1) * size).Take(size);
            }

            // Fetch products
            var products = await groupedQuery.ToListAsync();

            return (Products: products, Total: total);
        }



        public List<ProductDTOResponse> GetProductDetail(int id)
        {
            var query = from a in _context.Products
                        join c in _context.Categories on a.CategoryId equals c.Id
                        join b in _context.Attachments on a.Id equals b.ProductId into attachmentsGroup
                        where a.Id == id
                        select new ProductDTOResponse
                        {
                            Id = a.Id,
                            Name = a.Name,
                            Description = a.Description,
                            Author = a.Author,
                            CategoryId = a.CategoryId,
                            Price = a.Price,
                            Quantity = a.Quantity,
                            IsActive = a.IsActive,
                            categoryName=c.Name,
                            Attachments = attachmentsGroup.Select(att => att.Path).ToList()
                        };

            return query.ToList();
        }

        public async Task<List<ProductDTOResponse>> getList()
        {
            var query = await (from a in _context.Products
                               select new ProductDTOResponse
                               {
                                   Id = a.Id,
                                   Name = a.Name,
                                   Description = a.Description,
                                   Author = a.Author,
                                   CategoryId = a.CategoryId,
                                   Price = a.Price,
                                   Quantity = a.Quantity,
                                   IsActive = a.IsActive
                               }).ToListAsync();
            return query;
        }

        public async Task<bool> CheckProduct(int productId, int quantity)
        {
            var query = await _context.Products.FirstOrDefaultAsync(x => x.Id == productId);
            if (query.Quantity >= quantity)
                return true;
            return false;
        }

        public async Task<List<ProductDTOResponse>> getProductNew(int index = 1, int size = 3)
        {
            var query = (from a in _context.Products
                         join b in _context.Attachments on a.Id equals b.ProductId into attachmentsGroup
                         orderby a.Id descending
                         select new ProductDTOResponse
                         {
                             Id = a.Id,
                             Name = a.Name,
                             Description = a.Description,
                             Author = a.Author,
                             CategoryId = a.CategoryId,
                             Price = a.Price,
                             Quantity = a.Quantity,
                             IsActive = a.IsActive,
                             Path = a.Attachments.Any() ? a.Attachments.FirstOrDefault().Path : null,
                         });

            query = query.Skip((index - 1) * size).Take(size);

            return await query.ToListAsync();
        }



        public async Task<List<ProductDTOResponse>> getProductBestSelling(int index , int size)
        {
            var query = (from a in _context.Products
                         join b in _context.OrderItems on a.Id equals b.ProductId
                         group b by new { a.Id, a.Name, a.Description, a.Author, a.CategoryId, a.Price, a.IsActive } into g
                         orderby g.Sum(x => x.Quantity) descending
                         select new ProductDTOResponse
                         {
                             Id = g.Key.Id,
                             Name = g.Key.Name,
                             Description = g.Key.Description,
                             Author = g.Key.Author,
                             CategoryId = g.Key.CategoryId,
                             Price = g.Key.Price,
                             Quantity = g.Sum(x => x.Quantity), // Corrected to sum the quantity
                             IsActive = g.Key.IsActive,
                             Path = _context.Attachments
                                          .Where(attachment => attachment.ProductId == g.Key.Id)
                                          .Select(attachment => attachment.Path)
                                          .FirstOrDefault(),
                         });

            query = query.Skip((index - 1) * size).Take(size);

            return await query.ToListAsync();
        }




    }
}
