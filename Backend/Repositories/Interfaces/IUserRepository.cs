using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;

namespace DiscApi.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<int> getUserId(string username);
        public Task<UserDTOResponse> getUser(int userId);

    }
}
