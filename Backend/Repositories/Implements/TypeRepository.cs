using DiscApi.Data;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DiscApi.Repositories.Implements
{
    public class TypeRepository:ITypeRepository
    {
        private readonly ApplicationDbContext _context;

        public TypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<TypeDTOResponse>> getList()
        {
            var query = await (from a in _context.Types
                               select new TypeDTOResponse
                               {
                                   Id = a.Id,
                                   Name=a.Name,
                                   Description=a.Description,
                                   IsActive=a.IsActive, 
                               }).ToListAsync();
            return query;
        }
    }
}
