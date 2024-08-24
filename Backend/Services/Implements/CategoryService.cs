using AutoMapper;
using DiscApi.Base;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Repositories.Interfaces;
using DiscApi.Services.Interfaces;

namespace DiscApi.Services.Implements
{
    public class CategoryService:ICategoryService
    {
        private readonly IBaseRepository<Category> _baseRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ILogger<Category> logger;

        public CategoryService(IBaseRepository<Category> baseRepository, ICategoryRepository categoryRepository, ILogger<Category> logger)
        {
            _baseRepository = baseRepository;
            _categoryRepository = categoryRepository;
            this.logger = logger;
        }

        public async Task<List<CategoryDTOResponse>> getCategoryByTypeId(int typeId)
        {
            var query=await _categoryRepository.getCategoryByTypeId(typeId);
            return query;
        }

        public async Task<List<CategoryDTOResponse>> getList()
        {
            try
            {
                var categories = await _categoryRepository.getList();
                return categories ?? new List<CategoryDTOResponse>();
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error getting all categories");
                return new List<CategoryDTOResponse>();
            }
        }
    }

   
}
