namespace DiscApi.Models.DTOs.Requests
{
    public class CheckOutDTO
    {
        public  int[] Id { get; set; }
        public string Name {  get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string? Note { get; set; }
    }
}
