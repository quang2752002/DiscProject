using DiscApi.Base;
using DiscApi.Data;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace DiscApi.Repositories.Implements
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IBaseRepository<OrderItem> _orderItemBaseRepository;

        public OrderItemRepository(ApplicationDbContext context, IBaseRepository<OrderItem> orderItemBaseRepository)
        {
            _context = context;
            _orderItemBaseRepository = orderItemBaseRepository;
        }



        public async Task<(List<OrderItemDTOResponse> Review, int Total)> GetReviews(int id, int index, int size)
        {

            var orderItems = await _orderItemBaseRepository.SearchAsync(oi => oi.ProductId == id);
            var review = orderItems.Where(x=>x.FeedBack!=null&&x.VoteStar!=null).Select(oi => new OrderItemDTOResponse 
            {
                OrderId = oi.OrderId,
                Quantity = oi.Quantity,
                ProductId = oi.ProductId,
                FeedBack = oi?.FeedBack,
                VoteStar = oi.VoteStar == null ? 0 : oi.VoteStar.Value,
                Firstname = oi.Order.User.FirstName,
                Lastname = oi.Order.User.LastName,

            });
            int total = review.Count();


            if (size > 0 && index > 0)
            {
                review = review.Skip((index - 1) * size).Take(size);
            }


            return (Review: review.ToList(), Total: total);

        }
        public async Task<List<OrderItemDTOResponse>> GetOrderHistory(int userId)
        {
            var query = await (from a in _context.OrderItems

                               where a.Order.UserId == userId
                               orderby a.Order.OrderDate descending
                               select new OrderItemDTOResponse
                               {
                                   Id = a.Id,
                                   Quantity = a.Quantity,
                                   productName = a.Product.Name,
                                   Author = a.Product.Author,
                                   Price = a.Product.Price,
                                   OrderDate = a.Order.OrderDate,
                                   FeedBack = a.FeedBack,
                                   VoteStar = a.VoteStar ?? 0,
                                   OrderId = a.OrderId,
                                   ProductId = a.ProductId,
                                   Path = a.Product.Attachments.Any() ? a.Product.Attachments.FirstOrDefault().Path : null,
                                   Description = a.Product.Description,
                               }).ToListAsync();

            return query;
        }







        //public async Task<List<OrderItemDTORespone>> GetReviews(int id)
        //{
        //    // Lấy tất cả các OrderItem cho sản phẩm với ProductId = id
        //    var orderItems = await _orderItemBaseRepository.SearchAsync(oi => oi.ProductId == id);

        //    // Lọc các OrderItem mà người dùng có giới tính là nam
        //    var review = orderItems
        //        .Where(oi => oi.Order.User.Sex == "Male")  // Thay "Male" bằng giá trị giới tính chính xác nếu cần
        //        .Select(oi => new OrderItemDTORespone
        //        {
        //            OrderId = oi.OrderId,
        //            Quantity = oi.Quantity,
        //            ProductId = oi.ProductId,
        //            FeedBack = oi?.FeedBack,
        //            VoteStar = oi.VoteStar ?? 0,  // Đảm bảo VoteStar không bị null
        //            Firstname = oi.Order.User.FirstName,
        //            Lastname = oi.Order.User.LastName,
        //        }).ToList();

        //    return review;
        //}
    }
}
