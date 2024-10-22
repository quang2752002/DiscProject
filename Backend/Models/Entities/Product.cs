﻿using DiscApi.Base;
using System.ComponentModel.DataAnnotations;

namespace DiscApi.Models.Entities
{
    public class Product : BaseEntity
    {
        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string Name { get; set; }

        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string? Description { get; set; }

        public int CategoryId { get; set; }

        public double Price { get; set; }

        [StringLength(100, MinimumLength = 1, ErrorMessage = "")]
        public string Author { get; set; }

        public int Quantity { get; set; } = 0;

        public bool IsActive { get; set; } = true;

        //nav

        public virtual Category? Category { get; set; }
       
        public virtual ICollection<Attachment>? Attachments { get; set; }
        public virtual ICollection<Cart>? Carts { get; set; }

        public virtual ICollection<OrderItem>? OrderItems { get; set; }




    }
}
