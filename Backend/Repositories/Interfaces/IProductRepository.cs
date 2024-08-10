using DiscApi.Models.DTOs.Responses;
using DiscApi.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DiscApi.Repositories.Interfaces
{
    public interface IProductRepository
    {
      public Task<(List<ProductDTORespone> Products, int Total)> ShowListAsync(string name , int idType , int idCategory , int index , int size);
       public List<ProductDTORespone> GetProductDetail(int id);


    }
}
