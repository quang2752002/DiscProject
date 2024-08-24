using DiscApi.Models.DTOs.Responses;
using DiscApi.Repositories.Interfaces;
using DiscApi.Services.Interfaces;

namespace DiscApi.Services.Implements
{
    public class TypeService : ITypeService
    {
        public readonly ITypeRepository typeRepository;

        public TypeService(ITypeRepository typeRepository)
        {
            this.typeRepository = typeRepository;
        }

        public async Task<List<TypeDTOResponse>> getList()
        {
            var query= await typeRepository.getList();
            return query;
        }
    }
}
