using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace DiscApi.Models.Entities
{
    public class User : IdentityUser<int>
    {
        [Required]
        [StringLength(50, MinimumLength = 1,
        ErrorMessage = "The first name must contain between 1 and 50 characters")]
        public string FirstName { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 1,
        ErrorMessage = "The last name must contain between 1 and 50 characters")]
        public string LastName { get; set; }
        public DateTime? Dob { get; set; }
        [AllowNull]
        [StringLength(10, MinimumLength = 1,
        ErrorMessage = "The sex name must contain between 1 and 10 characters")]
        public string? Sex { get; set; }
        public string? Avatar { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        //navigation properies
        [JsonIgnore]
        public virtual ICollection<Cart>? Carts { get; set; }
        [JsonIgnore]
        public virtual ICollection<Order>? Orders { get; set; }
            

    }
}
