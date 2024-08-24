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
            //// Services
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IOrderItemService, OrderItemService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITypeService, TypeService>();

            //// Repositories
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IBaseRepository<Product>, BaseRepository<Product>>();

            services.AddScoped<IOrderItemRepository, OrderItemRepository>();
            services.AddScoped<IBaseRepository<OrderItem>, BaseRepository<OrderItem>>();

            services.AddScoped<IBaseRepository<Contact>, BaseRepository<Contact>>();

            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<IBaseRepository<Cart>, BaseRepository<Cart>>();

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IBaseRepository<Category>, BaseRepository<Category>>();

            services.AddScoped<IOrderRepository, OderRepository>();
            services.AddScoped<IBaseRepository<Order>, BaseRepository<Order>>();

            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<ITypeRepository, TypeRepository>();
            services.AddScoped<IBaseRepository<Models.Entities.Type>, BaseRepository<Models.Entities.Type>>();

            // Ensure that each repository is registered correctly
        }
    }
}
