using DiscApi.Models.DTOs.Responses;

namespace DiscApi.Repositories.Interfaces
{
    public interface IOrderItemRepository
    {
        public  Task<(List<OrderItemDTOResponse> Review, int Total)> GetReviews(int id, int index, int size);

        public Task<List<OrderItemDTOResponse>> GetOrderHistory(int userId);
     }
}
