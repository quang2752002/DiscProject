using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;

namespace DiscApi.Services.Interfaces
{
    public interface ICategoryService
    {
        public  Task<List<CategoryDTOResponse>> getList();
        public Task<List<CategoryDTOResponse>> getCategoryByTypeId(int typeId);
    }
}
