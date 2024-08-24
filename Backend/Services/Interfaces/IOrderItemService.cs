using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;

namespace DiscApi.Services.Interfaces
{
    public interface IOrderItemService
    {
        public Task<(List<OrderItemDTOResponse> Review, int Total)> GetReviews(int id, int index, int size);
        public Task<List<OrderItemDTOResponse>> GetOrderHistory(int userId);
       
        public Task<bool> FeedBack(OrderItemDTO orderItemDTO);

    }
}
