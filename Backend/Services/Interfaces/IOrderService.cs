using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;

namespace DiscApi.Services.Interfaces
{
    public interface IOrderService
    {
        public Task<ResponseData<OrderResDTO>> GetAllOrderAsync(DateTime? fromDate, DateTime? toDate, string searchString, int page, int size);
        public Task<Order> ChangeTransactionAsync(int id, int transaction);
        public Task<Order> ChangeStatusAsync(int id);
    }
}
