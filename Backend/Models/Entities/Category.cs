using DiscApi.Base;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DiscApi.Models.Entities
{
    public class Category : BaseEntity
    {
        [StringLength(100, MinimumLength = 1, ErrorMessage ="")]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string? Description { get; set; }
        public bool IsActive { get; set; }=true;
        //nav
        [JsonIgnore]
        public virtual ICollection<CategoryType>? CategoryTypes { get;set; }
        [JsonIgnore]
        public virtual ICollection<Product>? Products { get; set; }

    }
}
