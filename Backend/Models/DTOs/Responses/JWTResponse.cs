namespace DiscApi.Models.DTOs.Responses
{
    public class JWTResponse
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }

        public JWTResponse(string token, DateTime expiration)
        {
            Token = token;
            Expiration = expiration;
        }
    }
}
