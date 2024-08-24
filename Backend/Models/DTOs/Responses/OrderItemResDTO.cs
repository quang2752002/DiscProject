namespace DiscApi.Models.DTOs.Responses
{
    public class OrderItemResDTO
    {
        public int Id { get; set; }
        public string Product { get; set; }
        public double UnitPrice { get; set; }
        public int Quantity { get; set; }
        public string Feedback { get; set; }
        public int VoteStar { get; set; }
    }
}
