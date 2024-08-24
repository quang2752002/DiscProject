using DiscApi.Models.DTOs.Responses;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DiscApi.Services.Implements
{
    public class RoleService : IRoleService
    {
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public RoleService(RoleManager<IdentityRole<int>> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task<List<RoleResDTO>> GetAllRolesAsync()
        {
            var roleList = await _roleManager.Roles.ToListAsync();
            if (roleList == null) return new List<RoleResDTO>();
            return roleList.Select(role => new RoleResDTO()
            {
                Id = role.Id,
                Name = role.Name!
            }).ToList();
        }
    }
}
