using DiscApi.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Responses
{
    public class TypeResDTO
    {
        public int Id { get; set; }
        [StringLength(100, MinimumLength = 1, ErrorMessage = "The type name must contain between 1 and 100 characters")]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 1, ErrorMessage = "The type description must contain between 1 and 100 characters")]
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;
        public List<Category>? Category { get; set; } = null;
    }
}
