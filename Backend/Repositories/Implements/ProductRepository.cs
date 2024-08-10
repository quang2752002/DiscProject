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

        public async Task<(List<ProductDTORespone> Products, int Total)> ShowListAsync(string name, int idType, int idCategory, int index, int size)
        {
            name = name ?? string.Empty;

            var query = from a in _context.Products
                          
                            select new ProductDTORespone
                            {
                                Id=a.Id,
                               Name=a.Name,
                               Description=a.Description,
                               Author= a.Author,
                               CategoryId= a.CategoryId,
                               Price= a.Price,
                                Quantity = a.Quantity,
                                IsActive = a.IsActive
                            };

            
            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(p => p.Name.Contains(name));
            }

          
            int total = query.Count();

           
            if (size > 0 && index > 0)
            {
                query = query.Skip((index - 1) * size).Take(size);
            }

         

            return (Products: query.ToList(), Total: total);
        }


        public List<ProductDTORespone> GetProductDetail(int id)
        {
            var query = from a in _context.Products
                        join b in _context.Attachments on a.Id equals b.ProductId into attachmentsGroup
                        where a.Id == id
                        select new ProductDTORespone
                        {
                            Id = a.Id,
                            Name = a.Name,
                            Description = a.Description,
                            Author = a.Author,
                            CategoryId = a.CategoryId,
                            Price = a.Price,
                            Quantity = a.Quantity,
                            IsActive = a.IsActive,
                            Attachments = attachmentsGroup.Select(att => att.Path).ToList() 
                        };

            return query.ToList();
        }



    }
}
