using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;

namespace DiscApi.Services.Interfaces
{
    public interface ITypeService
    {
        public Task<ResponseData<TypeResDTO>> GetAllTypesAsync(string searchString, int page, int size);
        public Task<Models.Entities.Type> CreateTypeAsync(TypeReqDTO typeData);
        public Task<Models.Entities.Type> UpdateTypeAsync(int id, TypeReqDTO typeData);
        public Task<Models.Entities.Type> ToggleTypeStatusAsync(int id);
    }
}
