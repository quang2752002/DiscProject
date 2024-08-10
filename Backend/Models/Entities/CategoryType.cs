using DiscApi.Base;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace DiscApi.Models.Entities
{
    public class CategoryType : BaseEntity
    {
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public int TypeId { get; set; }
        //nav
        public virtual Category? Category { get; set; }
        public virtual Type? Type { get; set; }



    }
}
