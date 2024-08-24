using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Extensions;
using DiscApi.Base;
using Microsoft.AspNetCore.Http.HttpResults;
using static System.Runtime.InteropServices.JavaScript.JSType;
using DiscApi.Extentions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.DataProtection;

namespace DiscApi.Services.Implements
{
    public class UserService : IUserService
    {

        private readonly IBaseRepository<User> _userBaseRepo;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;

        public UserService(IBaseRepository<User> userBaseRepo, UserManager<User> userManager,
            RoleManager<IdentityRole<int>> roleManager, SignInManager<User> signInManager, IConfiguration config)
        {
            _userBaseRepo = userBaseRepo;
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _config = config;
        }

        public async Task<ResponseData<UserResDTO>> GetAllUsersAsync(string searchString, int page, int size)
        {
            IEnumerable<User> result = new List<User>();
            if (searchString.Any())
            {
                var searchResult = await _userBaseRepo.SearchAsync(u => u.FirstName.Contains(searchString)
                                                                    || u.LastName.Contains(searchString));
                result = searchResult.AsEnumerable()!;
            }
            else
            {
                result = await _userBaseRepo.GetAllAsync();
            }
            if (result == null) return new ResponseData<UserResDTO>(new List<UserResDTO>(), 0);
            result = result.ToList();
            var totalPages = result.Count() % size > 0 ? result.Count() / size + 1 : result.Count() / size;
            result = result!.Reverse().Skip((page - 1) * size).Take(size);
            var data = new List<UserResDTO>();
            foreach (var u in result)
            {

                var roleNames = await _userManager.GetRolesAsync(u);
                var userRole = await _roleManager.FindByNameAsync(roleNames.FirstOrDefault()!);
                data.Add(new UserResDTO()
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    Dob = u.Dob,
                    Sex = u.Sex,
                    Avatar = u.Avatar,
                    Role = new RoleResDTO()
                    {
                        Id = userRole!.Id,
                        Name = userRole.Name!
                    },
                    IsActive = u.IsActive,
                    CreatedAt = u.CreatedAt,
                });
            }
            return new ResponseData<UserResDTO>(data, totalPages); ;
        }


        public async Task<JWTResponse> CreateAccount(AddUserReqDTO userData, string role)
        {
            var roleExist = await _roleManager.FindByNameAsync(role);
            if (roleExist == null) throw new Exception("The role = " + role + " was not found");
            var mailExisting = await _userManager.FindByEmailAsync(userData.Email);
            if (mailExisting != null) throw new Exception("The email already used");
            var newUser = new User
            {
                FirstName = userData.FirstName,
                LastName = userData.LastName,
                UserName = userData.Email,
                Email = userData.Email,
                Sex = userData?.Sex,
                Dob = userData?.Dob,
                Avatar = FileHelper.UploadFile(userData?.Avatar)
            };
            var addUserResult = await _userManager.CreateAsync(newUser, userData.Password);
            if (!addUserResult.Succeeded) throw new Exception(addUserResult.ToString());
            var addRoleResult = await _userManager.AddToRoleAsync(newUser, roleExist.Name);
            if (!addRoleResult.Succeeded) throw new Exception(addRoleResult.ToString());

            var jwtToken = JWTHelper.GenerateJWTToken(newUser, new List<string>() { role }, 
                _config["JWT:Secret"]!, _config["JWT:ValidAudience"]!, _config["JWT:ValidIssuer"]!);
            return new JWTResponse(new JwtSecurityTokenHandler().WriteToken(jwtToken), jwtToken.ValidTo);
        }

        public async Task<JWTResponse> Login(LoginDTO loginForm)
        {
            var errorMessage = "The email or password is not valid";
            var userExisting = await _userManager.FindByEmailAsync(loginForm.Email);
            if (userExisting == null) throw new Exception(errorMessage);
            var passwordChecker = await _userManager.CheckPasswordAsync(userExisting, loginForm.Password);
            if (!passwordChecker) throw new Exception(errorMessage);
            await _signInManager.SignOutAsync();
            await _signInManager.PasswordSignInAsync(userExisting, loginForm.Password, loginForm.RememberMe!.Value, true);
            var userRoles = await _userManager.GetRolesAsync(userExisting);

            var jwtToken = JWTHelper.GenerateJWTToken(userExisting, userRoles, 
                _config["JWT:Secret"]!, _config["JWT:ValidAudience"]!, _config["JWT:ValidIssuer"]!);
            return new JWTResponse(new JwtSecurityTokenHandler().WriteToken(jwtToken), jwtToken.ValidTo);
        }

        public async Task<User> UpdateAccountAsync(UpdateUserReqDTO userData, int id)
        {
            var currentUser = await _userManager.FindByIdAsync(id + "");
            if (currentUser == null) throw new CustomException(404, $"The user with id = {id} was not found");
            var roleExisting = await _roleManager.FindByIdAsync(userData.RoleId + "");
            if (roleExisting == null) throw new CustomException(404, $"The role with id = {userData.RoleId} was not found");
            currentUser.FirstName = userData.FirstName;
            currentUser.LastName = userData.LastName;
            currentUser.Dob = userData.Dob;
            currentUser.Sex = userData.Sex;
            if (userData.Avatar != null)
            {
                if (currentUser.Avatar != null) FileHelper.RemoveFile(currentUser.Avatar!);
                currentUser.Avatar = FileHelper.UploadFile(userData.Avatar);
            }
            var currentUserRoles = await _userManager.GetRolesAsync(currentUser);
            if (!currentUserRoles[0].Equals(roleExisting.Name))
            {
                var removeRoleResult = await _userManager.RemoveFromRoleAsync(currentUser, currentUserRoles[0]);
                if (removeRoleResult.Succeeded) await _userManager.AddToRoleAsync(currentUser, roleExisting.Name!);
            }
            if (!userData.Password.IsNullOrEmpty() && !userData.OldPassword.IsNullOrEmpty())
            {

                var changePassResult = await _userManager.ChangePasswordAsync(currentUser, userData.OldPassword, userData.Password);
                if (!changePassResult.Succeeded) throw new CustomException(404, $"Failed to update because the old password is not correct");
            }
            var updateResult = await _userBaseRepo.UpdateAsync(currentUser);
            return updateResult;
        }
        public async Task<UserResDTO> ChangeRoleAsync(int userId, int roleId)
        {
            var userExisting = await _userManager.FindByIdAsync(userId + "");
            if (userExisting == null) throw new CustomException(404, $"The user with id = {userId} was not found");
            var roleExisting = await _roleManager.FindByIdAsync(roleId + "");
            if (roleExisting == null) throw new CustomException(404, $"The role with id = {roleId} was not found");
            var currentUserRoles = await _userManager.GetRolesAsync(userExisting);
            if (!currentUserRoles[0].Equals(roleExisting.Name))
            {
                var removeRoleResult = await _userManager.RemoveFromRoleAsync(userExisting, currentUserRoles[0]);
                if (removeRoleResult.Succeeded) await _userManager.AddToRoleAsync(userExisting, roleExisting.Name!);
            }
            var roleNames = await _userManager.GetRolesAsync(userExisting);
            var userRole = await _roleManager.FindByNameAsync(roleNames.FirstOrDefault()!);
            var response = new UserResDTO()
            {
                Id = userExisting.Id,
                FirstName = userExisting.FirstName,
                LastName = userExisting.LastName,
                Email = userExisting.Email,
                Dob = userExisting.Dob,
                Sex = userExisting.Sex,
                Avatar = userExisting.Avatar,
                Role = new RoleResDTO()
                {
                    Id = userRole!.Id,
                    Name = userRole.Name!
                },
                IsActive = userExisting.IsActive,
                CreatedAt = userExisting.CreatedAt,
            };
            return response;
        }

        public async Task<UserResDTO> ToggleUserStatusAsync(int userId)
        {
            var userExisting = await _userManager.FindByIdAsync(userId + "");
            if (userExisting == null) throw new CustomException(404, $"The user with id = {userId} was not found");
            userExisting.IsActive = !userExisting.IsActive;
            await _userBaseRepo.UpdateAsync(userExisting);
            var roleNames = await _userManager.GetRolesAsync(userExisting);
            var userRole = await _roleManager.FindByNameAsync(roleNames.FirstOrDefault()!);
            var response = new UserResDTO()
            {
                Id = userExisting.Id,
                FirstName = userExisting.FirstName,
                LastName = userExisting.LastName,
                Email = userExisting.Email,
                Dob = userExisting.Dob,
                Sex = userExisting.Sex,
                Avatar = userExisting.Avatar,
                Role = new RoleResDTO()
                {
                    Id = userRole!.Id,
                    Name = userRole.Name!
                },
                IsActive = userExisting.IsActive,
                CreatedAt = userExisting.CreatedAt,
            };
            return response;

        }


    }
}
