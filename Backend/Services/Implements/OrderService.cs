using DiscApi.Base;
using DiscApi.Constant;
using DiscApi.Extensions;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Services.Interfaces;

namespace DiscApi.Services.Implements
{
    public class OrderService : IOrderService
    {
        private readonly IBaseRepository<Order> _baseOrderRepo;

        public OrderService(IBaseRepository<Order> baseOrderRepo)
        {
            _baseOrderRepo = baseOrderRepo;
        }

        public async Task<ResponseData<OrderResDTO>> GetAllOrderAsync(DateTime? fromDate, DateTime? toDate, string searchString, int page, int size)
        {
            IEnumerable<Order> result = new List<Order>();
            if (fromDate != null && toDate != null || searchString.Any())
            {
                if (fromDate != null && toDate != null)
                {
                    result = await _baseOrderRepo.SearchAsync(o => o.OrderDate >= fromDate && o.OrderDate <= toDate);
                    if (!result.Any()) return new ResponseData<OrderResDTO>(new List<OrderResDTO>(), 0);
                }

                if (searchString.Any())
                {
                    result = result.Any() ?
                        result.Where(o => o.User!.FirstName.ToUpper().Contains(searchString.ToUpper()) || o.User!.LastName.ToUpper().Contains(searchString.ToUpper()))
                        : await _baseOrderRepo.SearchAsync(o => o.User!.FirstName.ToUpper().Contains(searchString.ToUpper()) || o.User!.LastName.ToUpper().Contains(searchString.ToUpper()));
                    if (!result.Any()) return new ResponseData<OrderResDTO>(new List<OrderResDTO>(), 0);
                }
            }
            else
            {
                result = await _baseOrderRepo.GetAllAsync();
            }
            var totalPages = result.Count() % size > 0 ? result.Count() / size + 1 : result.Count() / size;
            var data = result!.Reverse().Skip((page - 1) * size).Take(size).Reverse().Select(o => new OrderResDTO()
            {
                Id = o.Id,
                User = new UserResDTO()
                {
                    FirstName = o.User!.FirstName,
                    LastName = o.User!.LastName,
                    Email = o.User!.Email,
                    Dob = o.User?.Dob,
                    Sex = o.User?.Sex,
                    Avatar = o.User?.Avatar,
                    IsActive = o.IsActive,
                    CreatedAt = o.User!.CreatedAt,
                },
                OrderDate = o.OrderDate,
                PaymentMethod = o.PaymentMethod,
                IsActive = o.IsActive,
                Transaction = o.Transaction,
                OrderItems = o.OrderItems?.Select(oi => new OrderItemResDTO()
                {
                    Id = oi.Id,
                    Product = oi.Product.Name,
                    UnitPrice = oi.Product.Price,
                    Quantity = oi.Quantity,
                    Feedback = oi?.FeedBack,
                    VoteStar = oi.VoteStar.HasValue ? oi.VoteStar.Value : 0
                }).ToList(),
                Total = o.Total
            }).ToList();
            var response = new ResponseData<OrderResDTO>(data, totalPages);
            return response;
        }
        public async Task<Order> ChangeTransactionAsync(int id, int transaction)
        {
            var orderExisting = await _baseOrderRepo.GetByIdAsync(id);
            if (orderExisting == null) throw new CustomException(400, $"The order with id = {id} was not found");
            switch (transaction)
            {
                case 1:
                    orderExisting.Transaction = TransactionStatus.PROCESSING;
                    break;
                case 2:
                    orderExisting.Transaction = TransactionStatus.PREPARING;
                    break;
                case 3:
                    orderExisting.Transaction = TransactionStatus.DELIVERING;
                    break;
                case 4:
                    orderExisting.Transaction = TransactionStatus.DELIVERED;
                    break;
            }
            var addResult = await _baseOrderRepo.UpdateAsync(orderExisting);
            return addResult;
        }

        public async Task<Order> ChangeStatusAsync(int id)
        {
            var orderExisting = await _baseOrderRepo.GetByIdAsync(id);
            if (orderExisting == null) throw new CustomException(400, $"The order with id = {id} was not found");
            orderExisting.IsActive = !orderExisting.IsActive;
            var addResult = await _baseOrderRepo.UpdateAsync(orderExisting);
            return addResult;
        }
    }
}
