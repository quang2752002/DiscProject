using DiscApi.Base;
using DiscApi.Constant;
using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.Entities
{
    public class Contact : BaseEntity
    {
        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string FirstName {get; set; }
        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string LastName { get; set; }
        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        [EmailAddress]
        public string Email  { get; set; }
        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string Subject { get; set; }
        public string Message { get; set; }
        [Required]
        public string Status { get; set; } = ContactStatus.NOT_PROCESSED;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
