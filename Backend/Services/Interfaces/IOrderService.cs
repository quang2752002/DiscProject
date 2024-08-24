using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;

namespace DiscApi.Services.Interfaces
{
    public interface IOrderService
    {

        public Task<bool> Order(CheckOutDTO checkOutDTO ,int userId);// xử lý đặt hàng


    }
}
