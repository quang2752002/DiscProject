using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Extensions;

namespace DiscApi.Services.Implements
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;

        public UserService(UserManager<User> userManager, RoleManager<IdentityRole<int>> roleManager, 
            SignInManager<User> signInManager, IConfiguration config)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _config = config;
        }

        public async Task<JWTResponse> CreateAccount(RegisterDTO userData, string role)
        {
            var roleExist = await _roleManager.FindByNameAsync(role);
            if (roleExist == null) throw new Exception("The role = " + role + " was not found");
            var mailExisting = await _userManager.FindByEmailAsync(userData.Email);
            if (mailExisting != null) throw new Exception("The email already used");
            var newUser = new User()
            {
                FirstName = userData.FirstName,
                LastName = userData.LastName,
                UserName = userData.Email,
                Email = userData.Email,
                CreatedAt = DateTime.UtcNow
            };
            var addUserResult = await _userManager.CreateAsync(newUser, userData.Password);
            if (!addUserResult.Succeeded) throw new Exception(addUserResult.ToString());
            var addRoleResult = await _userManager.AddToRoleAsync(newUser, roleExist.Name);
            if (!addRoleResult.Succeeded) throw new Exception(addRoleResult.ToString());
            var jwtToken = JWTHelper.GenerateJWTToken(newUser, new List<string>() { role }, _config["JWTSecret"]!);
            return new JWTResponse(new JwtSecurityTokenHandler().WriteToken(jwtToken), jwtToken.ValidTo);
        }

        public async Task<JWTResponse> Login(LoginDTO loginForm)
        {
            var errorMessage = "The email or password is not valid";
            var userExisting = await _userManager.FindByEmailAsync(loginForm.Email);
            if (userExisting == null) throw new Exception(errorMessage);
            var passwordChecker = await _userManager.CheckPasswordAsync(userExisting, loginForm.Password);
            if(!passwordChecker) throw new Exception(errorMessage);
            await _signInManager.SignOutAsync();
            await _signInManager.PasswordSignInAsync(userExisting, loginForm.Password, loginForm.RememberMe!.Value, true);
            var userRoles = await _userManager.GetRolesAsync(userExisting);
            var jwtToken = JWTHelper.GenerateJWTToken(userExisting, userRoles, _config["JWTSecret"]!);
            return new JWTResponse(new JwtSecurityTokenHandler().WriteToken(jwtToken), jwtToken.ValidTo);
        }





















    }
}
