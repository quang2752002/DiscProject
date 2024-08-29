using Microsoft.EntityFrameworkCore;
using static DiscApi.Extensions.VNPayHelper;
using System.Net;
using DiscApi.Models.Entities;

namespace DiscApi.Services.Interfaces
{
    public interface IVNPayService
    {
        public string GetUrlPayment(int typePayment, Order orderId);
    }
}
