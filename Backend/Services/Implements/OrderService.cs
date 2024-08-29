using DiscApi.Base;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Repositories.Interfaces;
using DiscApi.Services.Interfaces;

namespace DiscApi.Services.Implements
{
    public class OrderService : IOrderService
    {
        private readonly IBaseRepository<Order> _baseRepository;
        private readonly IBaseRepository<Cart> _cartRepository;
        private readonly ILogger<Order> logger;
        private readonly IBaseRepository<OrderItem> _orderitemRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IBaseRepository<Product> _productRespository;

        public OrderService(IBaseRepository<Order> baseRepository, IBaseRepository<Cart> cartRepository, ILogger<Order> logger, IBaseRepository<OrderItem> orderitemRepository, IOrderRepository orderRepository, IBaseRepository<Product> productRespository)
        {
            _baseRepository = baseRepository;
            _cartRepository = cartRepository;
            this.logger = logger;
            _orderitemRepository = orderitemRepository;
            _orderRepository = orderRepository;
            _productRespository = productRespository;
        }

        public async Task<Order> Order(CheckOutDTO checkOutDTO, int userId)
        {
           
                Order order = new Order();
                order.UserId = userId;
                await _baseRepository.AddAsync(order);//them mới đơn hàng
                foreach (var item in checkOutDTO.Id)   
                {

                    OrderItem orderItem = new OrderItem();//thêm  mới chi tiết đơn hàng
                    var query  = await _cartRepository.GetByIdAsync(item);
                    orderItem.OrderId = order.Id;
                    orderItem.Quantity = query.Quantity;
                    orderItem.ProductId= query.ProductId;

                    var product=await _productRespository.GetByIdAsync(query.ProductId);
                    product.Quantity=product.Quantity-query.Quantity;
                    await _cartRepository.DeleteAsync(item);   //xóa giỏ hàng
                    await _orderitemRepository.AddAsync(orderItem);

                }
                return order;
           
        }
       
    }
}
