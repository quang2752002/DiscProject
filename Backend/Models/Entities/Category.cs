using DiscApi.Base;
using System.ComponentModel.DataAnnotations;

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
        public virtual ICollection<CategoryType>? CategoryTypes { get;set; }
        public virtual ICollection<Product>? Products { get; set; }

    }
}
