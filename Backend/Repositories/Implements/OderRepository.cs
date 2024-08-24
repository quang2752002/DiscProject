using DiscApi.Base;
using DiscApi.Data;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DiscApi.Repositories.Implements
{
    public class OderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IBaseRepository<Order> baseRepository;

        public OderRepository(ApplicationDbContext context, IBaseRepository<Order> baseRepository)
        {
            _context = context;
            this.baseRepository = baseRepository;
        }

        
    }
}
