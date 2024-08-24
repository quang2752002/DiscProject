using DiscApi.Models.DTOs.Responses;

namespace DiscApi.Services.Interfaces
{
    public interface IRoleService
    {
        public Task<List<RoleResDTO>> GetAllRolesAsync();
    }
}
