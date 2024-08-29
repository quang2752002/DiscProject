
using DiscApi.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;


namespace DiscApi.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
         : base(options)
        {
        }

        public DbSet<User> Users {  get; set; }
        public DbSet<Models.Entities.Attachment> Attachments {  get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<CategoryType> CategoryTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        public DbSet<Models.Entities.Type> Types { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Order>()
                .HasOne(o=>o.User)
                .WithMany(u=> u.Orders)
                .HasForeignKey(o=>o.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<IdentityRole<int>>().ToTable("Role");
            builder.Entity<User>().ToTable("User");
            builder.Entity<IdentityUserRole<int>>().ToTable("UserRole");          
        }
    }
}
