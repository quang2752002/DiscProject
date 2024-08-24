namespace DiscApi.Models.DTOs.Responses
{
    public class ProductDTOResponse
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

        public string categoryName { set; get; } = "";
        public string Path { set; get; } = "";

    }
}
