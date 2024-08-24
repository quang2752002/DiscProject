using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Responses
{
    public class TypeDTOResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }     
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
