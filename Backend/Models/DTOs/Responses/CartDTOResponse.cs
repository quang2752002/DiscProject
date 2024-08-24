namespace DiscApi.Models.DTOs.Responses
{
    public class CartDTOResponse
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }

        public string Name { get; set; }
        
        public double Price { get; set; }

        public double Total {  get; set; }

        public int maxProductQuantity { get; set; }

    }
}
