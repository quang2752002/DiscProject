namespace DiscApi.Models.DTOs.Requests
{
    public class CartDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }
    }
}
