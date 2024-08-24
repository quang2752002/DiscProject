using DiscApi.Base;
using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DiscApi.Models.Entities
{
    public class Product : BaseEntity
    {
        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string? Description { get; set; }

        public int CategoryId { get; set; }

        public double Price { get; set; }

        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string Author { get; set; }

        public int Quantity { get; set; } = 0;

        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        //nav
        [JsonIgnore]
        public virtual Category? Category { get; set; }
        [JsonIgnore]
        public virtual ICollection<Attachment>? Attachments { get; set; }
        [JsonIgnore]
        public virtual ICollection<Cart>? Carts { get; set; }
        [JsonIgnore]
        public virtual ICollection<OrderItem>? OrderItems { get; set; }




    }
}
