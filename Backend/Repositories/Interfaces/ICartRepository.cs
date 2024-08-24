using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace DiscApi.Repositories.Interfaces
{
    public interface ICartRepository
    {
        public Task<List<CartDTOResponse>> getCart(int userId);

        public Task<Cart> CheckCart(int userId, int productId);
        public Task<List<CartDTOResponse>> GetCheckOut(int[] cartId);

    }
}
