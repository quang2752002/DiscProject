using System.ComponentModel.DataAnnotations;

namespace DiscApi.Base
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
