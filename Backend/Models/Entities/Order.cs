using DiscApi.Base;
using DiscApi.Constant;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DiscApi.Models.Entities
{
    public class Order:BaseEntity
    {
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }= DateTime.Now;
        public string PaymentMethod { get; set; }
        public bool IsActive { get; set; }
        [Required]
        public string Transaction { get; set; } = TransactionStatus.PROCESSING;
        public int Total { get; set; }
        //nav
        [JsonIgnore]
        public virtual User? User { get; set; }
        [JsonIgnore]
        public virtual ICollection<OrderItem>? OrderItems { get; set; }
    }
}
