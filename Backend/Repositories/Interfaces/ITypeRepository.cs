using DiscApi.Models.DTOs.Responses;

namespace DiscApi.Repositories.Interfaces
{
    public interface ITypeRepository
    {
        public Task<List<TypeDTOResponse>> getList();
    }
}
