using DiscApi.Models.Entities;

namespace DiscApi.Models.DTOs.Responses
{
    public class OrderDTOResponse
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public string PaymentMethod { get; set; } = "";
        public bool IsActive { get; set; } = true;
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public virtual User? User { get; set; }
        public string productName {  get; set; }
        public double Price { get; set; }     
        public int Quantity { get; set; }

    }
}
