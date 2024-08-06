using DiscApi.Base;

namespace DiscApi.Models.Entities
{
    public class Order:BaseEntity
    {
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }= DateTime.Now;
        public string PaymentMethod { get; set; }
        public bool IsActive { get; set; }

        public virtual User? User { get; set; }




    }
}
