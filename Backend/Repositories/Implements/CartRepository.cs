using DiscApi.Data;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace DiscApi.Repositories.Implements
{
    public class CartRepository : ICartRepository
    {
        private readonly ApplicationDbContext _context;

        public CartRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Cart> CheckCart(int userId, int productId)
        {
            var query = await _context.Carts.Where(x=>x.UserId==userId && x.ProductId==productId).FirstOrDefaultAsync();
            return query;
        }

        public async Task<List<CartDTOResponse>> getCart(int userId)
        {
            var query = await (from a in _context.Carts
                               join b in  _context.Products on a.ProductId equals b.Id
                               where a.UserId == userId
                               select new CartDTOResponse
                               {
                                   Id = a.Id,
                                   ProductId = a.ProductId,
                                   Quantity = a.Quantity,
                                   UserId = a.UserId,
                                   Price=b.Price,
                                   Name=b.Name,
                                   
                               }).ToListAsync();

            return query;
        }
        public async Task<List<CartDTOResponse>> GetCheckOut(int[] cartId)
        {
            var rs= new List<CartDTOResponse>();
            foreach (var id in cartId)
            {
                var query = await (from a in _context.Carts
                                   join b in _context.Products on a.ProductId equals b.Id
                                   where a.Id == id
                                   select new CartDTOResponse
                                   {
                                       Id = a.Id,
                                       ProductId = a.ProductId,
                                       Quantity = a.Quantity,
                                       UserId = a.UserId,
                                       Price = b.Price,
                                       Name = b.Name,
                                       Total=b.Price*a.Quantity,
                                    }).FirstOrDefaultAsync();
                if (query != null)
                {
                    rs.Add(query);
                }
                  
            } 
            return rs;
        }

       
    }
}
