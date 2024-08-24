using DiscApi.Base;
using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using DiscApi.Repositories.Implements;
using DiscApi.Repositories.Interfaces;
using DiscApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DiscApi.Services.Implements
{
    public class CartService : ICartService
    {
        private readonly IBaseRepository<Cart> _baseRepository;
        private readonly ILogger<Cart> logger;
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;

        public CartService(IBaseRepository<Cart> baseRepository, ILogger<Cart> logger, ICartRepository cartRepository, IProductRepository productRepository)
        {
            _baseRepository = baseRepository;
            this.logger = logger;
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }

        public async Task<bool> InsertAsync(int userId, int productId, int quantity)
        {
            try
            {

                if (await _cartRepository.CheckCart(userId, productId) == null)
                {
                    if (await _productRepository.CheckProduct(productId, quantity))
                    {
                        Cart item = new Cart()
                        {
                            ProductId = productId,
                            Quantity = quantity,
                            UserId = userId
                        };
                        await _baseRepository.AddAsync(item);
                        return true;
                    }
                    else
                    {

                        return false;
                    }
                }
                else
                {

                    Cart cart = await _cartRepository.CheckCart(userId, productId);
                    cart.Quantity = cart.Quantity + quantity;
                    if (await _productRepository.CheckProduct(productId, cart.Quantity))
                    {
                        await _baseRepository.UpdateAsync(cart);
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public async Task<bool> UpdateAsync(int id, int quantity)
        {
            try
            {
                var query = await _baseRepository.GetByIdAsync(id);
                if (query != null)
                {
                    query.Quantity = quantity;
                    _baseRepository.UpdateAsync(query);
                    return true;
                }
                return false;

            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error");
                return false;
            }
        }
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                Cart cart = await _baseRepository.GetByIdAsync(id);
                int query = await _baseRepository.RemoveAsync(cart);
                if (query > 0)
                    return true;
                return false;

            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error");
                return false;
            }
        }

        public async Task<List<CartDTOResponse>> getCart(int userId)
        {
            try
            {
                var query = await _cartRepository.getCart(userId);
                return query;
            }
            catch (Exception ex)
            {

                logger.LogError(ex, "Error");
                return null;
            }
        }

        public async Task<bool> UpdateQuantity(int id, int quantity)
        {
            try
            {
                var query = await _baseRepository.GetByIdAsync(id);
                query.Quantity = quantity;
                await _baseRepository.UpdateAsync(query);
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        public async Task<List<CartDTOResponse>> GetCheckOut(int[] cartId)
        {
            var query = await _cartRepository.GetCheckOut(cartId);
            return query;
        }
    }
}
