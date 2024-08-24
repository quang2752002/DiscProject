using DiscApi.Base;
using DiscApi.Extensions;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;

namespace DiscApi.Services.Implements
{
    public class CategoryService : ICategoryService
    {
        private readonly IBaseRepository<Category> _baseCategoryRepo;

        public CategoryService(IBaseRepository<Category> baseCategoryRepo)
        {
            _baseCategoryRepo = baseCategoryRepo;
        }

        public async Task<ResponseData<Category>> GetAllCategories(string searchString, int page, int size)
        {
            IEnumerable<Category> result = new List<Category>();
            if (searchString.Any())
            {
                var searchResult = await _baseCategoryRepo.SearchAsync(p => p.Name.Contains(searchString));
                if (searchResult == null) return new ResponseData<Category>(new List<Category>(), 0);
                result = searchResult!;
            }
            else
            {
                result = await _baseCategoryRepo.GetAllAsync();
            }
            var totalPages = result.Count() % size > 0 ? result.Count() / size + 1 : result.Count() / size;
            var data = result!.Reverse().Skip((page - 1) * size).Take(size).Select(p => new Category
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                IsActive = p.IsActive,
                CategoryTypes = p.CategoryTypes
            }).ToList();
            var response = new ResponseData<Category>(data, totalPages);
            return response;
        }

        public async Task<Category> GetCategoryById(int id)
        {
            try
            {
                var categoryExisting = await _baseCategoryRepo.GetByIdAsync(id);
                return categoryExisting;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<Category> CreateCategoryAsync(CategoryReqDTO categoryData)
        {
            Category newCategory = new Category()
            {
                Name = categoryData.Name,
                Description = categoryData.Description,
            };
            var addResult = await _baseCategoryRepo.AddAsync(newCategory);
            return addResult;
        }

        public async Task<Category> UpdateCategoryAsync(int id, CategoryReqDTO categoryData)
        {
            var categoryExsiting = await _baseCategoryRepo.GetByIdAsync(id);
            if (categoryExsiting == null) throw new CustomException(400, $"The category with id = {id} was not found");
            categoryExsiting.Name = categoryData.Name;
            categoryExsiting.Description = categoryData.Description;
            var updateResult = await _baseCategoryRepo.UpdateAsync(categoryExsiting);
            return updateResult;
        }
        public async Task<Category> ToggleStatusCategoryAsync(int id)
        {
            var categoryExsiting = await _baseCategoryRepo.GetByIdAsync(id);
            if (categoryExsiting == null) throw new CustomException(400, $"The category with id = {id} was not found");
            categoryExsiting.IsActive = !categoryExsiting.IsActive;
            var updateResult = await _baseCategoryRepo.UpdateAsync(categoryExsiting);
            return updateResult;
        }
    }
}
