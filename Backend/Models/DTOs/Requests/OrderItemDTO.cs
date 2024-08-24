using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Requests
{
    public class OrderItemDTO
    {
        public int Id { get; set; } 
        public int OrderId { get; set; }
        public int Quantity { get; set; }

        public int ProductId { get; set; }

        public string FeedBack { get; set; }

        public int VoteStar { get; set; }
    }
}
