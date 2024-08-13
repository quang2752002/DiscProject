﻿using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace DiscApi.Models.DTOs.Requests
{
    public class RegisterDTO : LoginDTO
    {
        [Required]
        [StringLength(50, MinimumLength = 1,
        ErrorMessage = "The first name must contain between 1 and 50 characters")]
        public string FirstName { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 1,
        ErrorMessage = "The last name must contain between 1 and 50 characters")]
        public string LastName { get; set; }
    }
}