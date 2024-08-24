using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Requests
{
    public class TypeReqDTO
    {
        [StringLength(50, MinimumLength = 2)]
        public string Name { get; set; }
        public string? Description { get; set; }
        [Required]
        public List<int> CategoryIds{ get; set; }
    }
}
