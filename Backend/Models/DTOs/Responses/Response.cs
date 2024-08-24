namespace DiscApi.Models.DTOs.Responses
{
    public class Response
    {
        public int StatusCode {  get; set; }
        public string Message { get; set; }

        public Response(int statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message;
        }
    }
}
