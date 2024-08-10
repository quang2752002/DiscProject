using DiscApi.Base;

namespace DiscApi.Models.Entities
{
    public class Cart:BaseEntity
    {
        public int UserId {  get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }
        
        //nav
        public virtual Product? Product { get; set; }
        public virtual User? Users { get; set; }

        public virtual ICollection<OrderItem>? OrderItems { get; set; }




    }
}
