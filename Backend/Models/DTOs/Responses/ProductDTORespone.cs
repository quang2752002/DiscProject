namespace DiscApi.Models.DTOs.Responses
{
    public class ProductDTORespone
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }

        public double Price { get; set; }

        public string Author { get; set; }

        public int Quantity { get; set; } = 0;

        public bool IsActive { get; set; } = true;
        public List<string> Attachments { get; set; } // List of attachment paths


    }
}
