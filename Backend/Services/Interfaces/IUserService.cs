using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using System.IdentityModel.Tokens.Jwt;

namespace DiscApi.Services.Interfaces
{
    public interface IUserService
    {
        public Task<JWTResponse> CreateAccount(RegisterDTO userData, string role);
        public Task<JWTResponse> Login(LoginDTO loginForm);
    }
}
