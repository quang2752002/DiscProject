using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using System.IdentityModel.Tokens.Jwt;

namespace DiscApi.Services.Interfaces
{
    public interface IUserService
    {
        public Task<JWTResponse> Login(LoginDTO loginForm);
        public Task<ResponseData<UserResDTO>> GetAllUsersAsync(string searchString, int page, int size);
        public Task<JWTResponse> CreateAccount(AddUserReqDTO userData, string role);
        public Task<User> UpdateAccountAsync(UpdateUserReqDTO userData, int id);
        public Task<UserResDTO> ChangeRoleAsync(int userId, int roleId);
        public Task<UserResDTO> ToggleUserStatusAsync(int userId);
    }
}
