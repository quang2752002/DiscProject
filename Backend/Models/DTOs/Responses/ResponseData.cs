namespace DiscApi.Models.DTOs.Responses
{
    public class ResponseData<T>
    {
        public int TotalPages  { get; set; }
        public List<T> Data { get; set; }

        public ResponseData(List<T> data, int totalPages)
        {
            Data = data;
            TotalPages = totalPages;
        }
    }
}
