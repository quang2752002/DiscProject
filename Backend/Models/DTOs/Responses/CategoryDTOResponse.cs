using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Responses
{
    public class CategoryDTOResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
