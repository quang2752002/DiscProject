using DiscApi.Base;
using DiscApi.Models.Entities;
using DiscApi.Repositories.Implements;
using DiscApi.Repositories.Interfaces;
using DiscApi.Services.Implements;
using DiscApi.Services.Interfaces;

namespace DiscApi.Extension
{
    public class ServiceRegister
    {
        public static void Register(IServiceCollection services)
        {
            ////Services
            services.AddScoped<IProductService, ProductService>();
          

            ////Repositories
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBaseRepository<Product>, BaseRepository<Product>>();





        }
    }
}
