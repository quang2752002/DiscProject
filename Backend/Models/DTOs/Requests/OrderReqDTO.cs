using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Requests
{
    public class OrderReqDTO
    {
        [Range(1, 4)]
        public int TransactionCode { get; set; }
    }
}
