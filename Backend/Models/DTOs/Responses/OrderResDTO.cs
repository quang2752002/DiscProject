using DiscApi.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Responses
{
    public class OrderResDTO
    {
        public int Id { get; set; }
        public UserResDTO User { get; set; }
        public DateTime OrderDate { get; set; }
        public string PaymentMethod { get; set; }
        public bool IsActive { get; set; }
        public string Transaction { get; set; } 
        public List<OrderItemResDTO>  OrderItems { get; set; }
        public int Total {  get; set; }
    }
}
