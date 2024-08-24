using DiscApi.Base;
using System.Text.Json.Serialization;

namespace DiscApi.Models.Entities
{
    public class Attachment : BaseEntity
    {
        public int ProductId { get; set; }
        public string Type { get; set; }
        public string Path { get; set; }


        [JsonIgnore]
        public virtual Product? Product { get; set; }
             
    }
}
