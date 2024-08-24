using DiscApi.Models.DTOs.Requests;
using DiscApi.Models.DTOs.Responses;
using Microsoft.AspNetCore.Mvc;

namespace DiscApi.Services.Interfaces
{
    public interface ICartService
    {
        public Task<bool> InsertAsync(int userId ,int productId,int quantity);
        public Task<bool> UpdateAsync(int id, int quantity);
        public Task<bool> DeleteAsync(int id);
        public Task<List<CartDTOResponse>> getCart(int userId);
        public Task<bool> UpdateQuantity(int id, int quantity);
        public Task<List<CartDTOResponse>> GetCheckOut(int[] cartId);

    }
}
