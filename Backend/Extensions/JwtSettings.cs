namespace DiscApi.Extensions
{
    public class JwtSettings
    {
        public string Secretkey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int ExpiryMinutes { get; set; }
    }
}
