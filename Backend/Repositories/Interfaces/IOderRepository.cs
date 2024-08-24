
using DiscApi.Models.DTOs.Responses;

namespace DiscApi.Repositories.Interfaces
{
    public interface IOderRepository
    {
        public Task<List<OrderItemDTORespone>> getOrderHistory(int userId);
       
}
