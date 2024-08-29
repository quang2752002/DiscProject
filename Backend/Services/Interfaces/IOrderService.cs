using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;

namespace DiscApi.Services.Interfaces
{
    public interface IOrderService
    {

        public Task<Order> Order(CheckOutDTO checkOutDTO ,int userId);// xử lý đặt hàng


    }
}
