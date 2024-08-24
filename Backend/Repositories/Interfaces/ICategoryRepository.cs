using DiscApi.Models.DTOs.Responses;

namespace DiscApi.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        public Task<List<CategoryDTOResponse>> getList();
        public Task<List<CategoryDTOResponse>> getCategoryByTypeId(int id);

    }
}
