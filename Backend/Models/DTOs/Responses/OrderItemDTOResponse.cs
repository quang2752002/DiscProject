using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Responses
{
    public class OrderItemDTOResponse
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public int Quantity { get; set; }

        public int ProductId { get; set; }

        public string FeedBack { get; set; }
        public string Description { get; set; }

        public int VoteStar { get; set; }
      
        public string productName { get; set; }
        public string Author { get; set; }
        public double Price { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime OrderDate { get; set; }
        public string Path { set; get; }

    }
}
