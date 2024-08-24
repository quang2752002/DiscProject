using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Requests
{
    public class LoginDTO
    {
        [Required]
        [EmailAddress(ErrorMessage = "Email is not valid")]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

      

    }
}
