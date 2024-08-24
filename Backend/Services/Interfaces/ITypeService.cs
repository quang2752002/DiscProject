using DiscApi.Models.DTOs.Responses;

namespace DiscApi.Services.Interfaces
{
    public interface ITypeService
    {
        public Task<List<TypeDTOResponse>> getList();
    }
}
