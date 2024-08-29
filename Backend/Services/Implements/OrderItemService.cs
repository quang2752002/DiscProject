using DiscApi.Base;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Repositories.Implements;
using DiscApi.Repositories.Interfaces;
using DiscApi.Services.Interfaces;

namespace DiscApi.Services.Implements
{
    public class OrderItemService : IOrderItemService
    {
        private readonly IBaseRepository<OrderItem> baseRepository; 
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly ILogger<OrderItem> logger;

        public OrderItemService(IBaseRepository<OrderItem> baseRepository, IOrderItemRepository orderItemRepository, ILogger<OrderItem> logger)
        {
            this.baseRepository = baseRepository;
           this._orderItemRepository = orderItemRepository;
            this.logger = logger;
        }

        public async Task<(List<OrderItemDTOResponse> Review, int Total)> GetReviews(int id, int index, int size)
        {
            
                var query = await _orderItemRepository.GetReviews(id,index,size);
                return query;
            

        }
        public async Task<List<OrderItemDTOResponse>> GetOrderHistory(int userId)
        {
            var query=await _orderItemRepository.GetOrderHistory(userId);
            return query;
        }
       

        public async Task<bool> FeedBack(OrderItemDTO orderItemDTO)
        {
            OrderItem orderItem = await baseRepository.GetByIdAsync(orderItemDTO.Id);
            if (orderItem.FeedBack == null && orderItem.VoteStar == null)
            {
                orderItem.VoteStar= orderItemDTO.VoteStar;
                orderItem.FeedBack= orderItemDTO.FeedBack;
                await baseRepository.UpdateAsync(orderItem);
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
