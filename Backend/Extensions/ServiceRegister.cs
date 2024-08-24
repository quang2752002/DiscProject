using DiscApi.Base;
using DiscApi.Models.Entities;
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
            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ITypeService, TypeService>();
            services.AddScoped<IAttachmentService, AttachmentService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IOrderService, OrderService>();


            ////Repositories
            services.AddScoped<IBaseRepository<Product>, BaseRepository<Product>>();
            services.AddScoped<IBaseRepository<Category>, BaseRepository<Category>>();
            services.AddScoped<IBaseRepository<CategoryType>, BaseRepository<CategoryType>>();
            services.AddScoped<IBaseRepository<Attachment>, BaseRepository<Attachment>>();
            services.AddScoped<IBaseRepository<Models.Entities.Type>, BaseRepository<Models.Entities.Type>>();
            services.AddScoped<IBaseRepository<User>, BaseRepository<User>>();
            services.AddScoped<IBaseRepository<Contact>, BaseRepository<Contact>>();
            services.AddScoped<IBaseRepository<Order>, BaseRepository<Order>>();


        }
    }
}
