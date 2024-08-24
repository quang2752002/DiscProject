using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Responses
{
    public class CategoryResDTO
    {
        public int Id { get; set; }
        [StringLength(100, MinimumLength = 1, ErrorMessage = "The category name must contain between 1 and 100 characters")]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 1, ErrorMessage = "The category description must contain between 1 and 100 characters")]
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
