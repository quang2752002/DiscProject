using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DiscApi.Data;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

public class CategoryRepository : ICategoryRepository
{
    private readonly ApplicationDbContext _context;

    public CategoryRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<CategoryDTOResponse>> getCategoryByTypeId(int typeTd)
    {
       var query= await (from a in _context.Categories
                         join b in _context.CategoryTypes on a.Id equals b.CategoryId
                         where b.TypeId == typeTd
                         select new CategoryDTOResponse
                         {
                             Id = a.Id,
                             Name = a.Name,
                             Description= a.Description,
                             IsActive = a.IsActive,
                         }).ToListAsync();
        return query;
    }

    public async Task<List<CategoryDTOResponse>> getList()
    {
        try
        {
            var categories = await (from a in _context.Categories
                                    select new CategoryDTOResponse
                                    {
                                        Id = a.Id,
                                        Name = a.Name,
                                        Description = a.Description,
                                        IsActive = a.IsActive
                                    }).ToListAsync();

            return categories;
        }
        catch (Exception ex)
        {
            throw new ApplicationException("An error occurred while retrieving categories.", ex);
        }
    }

}


