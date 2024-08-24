using DiscApi.Base;
using Microsoft.CodeAnalysis;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace DiscApi.Models.Entities
{
    public class OrderItem:BaseEntity
    {
        public int OrderId { get; set; }
        public int Quantity { get; set; }

        public int ProductId { get; set; }

        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string? FeedBack { get; set; }

        [Range(1, 5, ErrorMessage = "Vote star must be between 1 and 5.")]
        public int? VoteStar { get; set; } = 0;


        //nav
        public virtual Product? Product { get; set; }
        public virtual Order? Order { get; set; }



    }
}
