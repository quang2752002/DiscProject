using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Requests
{
    public class AddUserReqDTO
    {
        [StringLength(50, MinimumLength = 1)]
        public string FirstName { get; set; }
        [StringLength(50, MinimumLength = 1)]
        public string LastName { get; set; }
        [EmailAddress]
        [StringLength(50, MinimumLength = 5)]
        public string Email { get; set; } = null;
        public string? Password { get; set; }
        public DateTime? Dob { get; set; }
        public string? Sex { get; set; }
        public int RoleId { get; set; }
        public IFormFile? Avatar { get; set; }
    }

    public class UpdateUserReqDTO : AddUserReqDTO
    {
        public string? OldPassword { get; set; }
    }

    public class ChangeRoleDTO
    {
        [Required]
        public int RoleId { get; set; }
    }
}
