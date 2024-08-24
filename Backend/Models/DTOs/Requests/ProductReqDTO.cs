using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Requests
{
    public class AddProductDTO
    {
        [StringLength(100, MinimumLength = 1)]
        public string Name { get; set; }
        public string? Description { get; set; }
        public int CategoryId { get; set; }
        [Range(1, 10000000)]
        public double Price { get; set; }
        [StringLength(100, MinimumLength = 1)]
        public string Author { get; set; }
        public List<IFormFile> Upload { get; set; } = new List<IFormFile>();
    }

    public class UpdateProductDTO : AddProductDTO
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
    }
}
