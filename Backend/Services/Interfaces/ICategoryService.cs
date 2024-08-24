using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;

namespace DiscApi.Services.Interfaces
{
    public interface ICategoryService
    {
        public Task<ResponseData<Category>> GetAllCategories(string searchString, int page , int size);

        public Task<Category> GetCategoryById(int id);
        public Task<Category> CreateCategoryAsync(CategoryReqDTO categoryData);
        public Task<Category> UpdateCategoryAsync(int id, CategoryReqDTO categoryData);
        public Task<Category> ToggleStatusCategoryAsync(int id);
    }
}
