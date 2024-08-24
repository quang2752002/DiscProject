using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;

namespace DiscApi.Services.Interfaces
{
    public interface IUserService
    {
        public Task<JWTResponse> CreateAccount(RegisterDTO userData, string role);
        public Task<JWTResponse> Login(LoginDTO loginForm);

        public Task<bool> SignIn(string username,string password);

        public Task<int> getUserId(string userName);
        public Task<bool> SignUp(RegisterDTO userData);
        public Task<UserDTOResponse> getUser(int userId);
    }
}
