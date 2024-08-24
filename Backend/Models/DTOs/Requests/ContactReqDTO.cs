using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.DTOs.Requests
{
    public class ContactReqDTO
    {
        [Range(1,3)]
        public int Status { get; set; }
    }
}
