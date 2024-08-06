using DiscApi.Base;
using Microsoft.CodeAnalysis;
using System.IO;
using System.Runtime.InteropServices;

namespace DiscApi.Models.Entities
{
    public class Attachment : BaseEntity
    {
        public int ProductId { get; set; }
        public string Type { get; set; }
        public string Path { get; set; }

        public virtual Product? Product { get; set; }
             
    }
}
