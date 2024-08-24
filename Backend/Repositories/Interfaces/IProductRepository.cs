using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DiscApi.Repositories.Interfaces
{
    public interface IProductRepository
    {
        public Task<(List<ProductDTOResponse> Products, int Total)> ShowListAsync(string name, int idType, int idCategory, int index, int size);
        public List<ProductDTOResponse> GetProductDetail(int id);
        public Task<List<ProductDTOResponse>> getList();
        public Task<bool> CheckProduct(int productId, int quantity);

        public Task<List<ProductDTOResponse>> getProductNew(int index,int size);
        public Task<List<ProductDTOResponse>> getProductBestSelling(int index, int size);
    }
}
