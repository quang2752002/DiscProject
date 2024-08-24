using DiscApi.Models.Entities;

namespace DiscApi.Models.DTOs.Responses
{
    public class ProductResDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }

        public double Price { get; set; }

        public string Author { get; set; }

        public int Quantity { get; set; } = 0;

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public ICollection<Attachment> Attachments { get; set; } 
        public Category Category { get; set; }
    }
}
