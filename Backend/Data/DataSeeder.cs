
using DiscApi.Constant;
using DiscApi.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DiscApi.Data
{
    public class DataSeeder
    {
        public static void SeedData(IServiceProvider serviceProvider)
        {
            //seeding role
            using (var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>())
            {
                if (!roleManager.Roles.Any())
                {
                    string[] roleNames = { RoleName.ADMIN, RoleName.CUSTOMER };

                    foreach (var roleName in roleNames)
                    {
                        var role = new IdentityRole<int>(roleName);
                        roleManager.CreateAsync(role).Wait();
                    }
                }
            }

            //seeding users
            using (var scope = serviceProvider.CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                if (!userManager.Users.Any())
                {

                    List<User> users = new List<User>
                {
                    new User { FirstName = "Alice", LastName = "Johnson", UserName = "alice.johnson@example.com", Email = "alice.johnson@example.com", Sex = "Female", Dob = new DateTime(1985, 5, 15), Avatar = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724371200&semt=ais_hybrid" },
                    new User { FirstName = "Bob", LastName = "Smith", UserName = "bob.smith@example.com", Email = "bob.smith@example.com", Sex = "Male", Dob = new DateTime(1990, 8, 22), Avatar = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724371200&semt=ais_hybrid" },
                    new User { FirstName = "Charlie", LastName = "Brown", UserName = "charlie.brown@example.com", Email = "charlie.brown@example.com", Sex = "Male", Dob = new DateTime(1978, 3, 30), Avatar = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724371200&semt=ais_hybrid" },
                    new User { FirstName = "Diana", LastName = "Prince", UserName = "diana.prince@example.com", Email = "diana.prince@example.com", Sex = "Female", Dob = new DateTime(1992, 12, 5), Avatar = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724371200&semt=ais_hybrid" },
                    new User { FirstName = "Edward", LastName = "Norton", UserName = "edward.norton@example.com", Email = "edward.norton@example.com", Sex = "Male", Dob = new DateTime(1988, 7, 11), Avatar = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724371200&semt=ais_hybrid" },
                    new User { FirstName = "Fiona", LastName = "Williams", UserName = "fiona.williams@example.com", Email = "fiona.williams@example.com", Sex = "Female", Dob = new DateTime(1995, 11, 20), Avatar = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724371200&semt=ais_hybrid" },
                    new User { FirstName = "George", LastName = "Miller", UserName = "george.miller@example.com", Email = "george.miller@example.com", Sex = "Male", Dob = new DateTime(1983, 6, 12), Avatar = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724371200&semt=ais_hybrid" },
                    new User { FirstName = "Hannah", LastName = "Clark", UserName = "hannah.clark@example.com", Email = "hannah.clark@example.com", Sex = "Female", Dob = new DateTime(1991, 9, 8), Avatar = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724371200&semt=ais_hybrid" },
                    new User { FirstName = "Ian", LastName = "Davis", UserName = "ian.davis@example.com", Email = "ian.davis@example.com", Sex = "Male", Dob = new DateTime(1987, 4, 25), Avatar = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724371200&semt=ais_hybrid" },
                    new User { FirstName = "Jane", LastName = "Doe", UserName = "jane.doe@example.com", Email = "jane.doe@example.com", Sex = "Female", Dob = new DateTime(1990, 1, 17), Avatar = "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1724371200&semt=ais_hybrid" }
                };

                    foreach (var user in users)
                    {
                        userManager.CreateAsync(user, "PasswordUser123").Wait();
                        userManager.AddToRoleAsync(user, RoleName.CUSTOMER).Wait();
                    }
                }

            }


            using (var dbContext = serviceProvider.GetRequiredService<ApplicationDbContext>())
            {
                //seeding category
                if (!dbContext.Categories.Any())
                {
                    dbContext.AddRange(
                        new Category { Name = "Music" },
                        new Category { Name = "Movies" },
                        new Category { Name = "Games" },
                        new Category { Name = "Software" },
                        new Category { Name = "Audiobooks" },
                        new Category { Name = "Educational" },
                        new Category { Name = "Documentaries" },
                        new Category { Name = "Sports" },
                        new Category { Name = "TV Shows" },
                        new Category { Name = "Podcasts" },
                        new Category { Name = "Concerts" }
                    );
                    dbContext.SaveChanges();
                }

                //seeding type
                if (!dbContext.Types.Any())
                {
                    dbContext.AddRange(
                        new Models.Entities.Type { Name = "DVD" },
                        new Models.Entities.Type { Name = "Blu-ray" },
                        new Models.Entities.Type { Name = "CD" },
                        new Models.Entities.Type { Name = "Vinyl" },
                        new Models.Entities.Type { Name = "Digital Download" },
                        new Models.Entities.Type { Name = "LaserDisc" },
                        new Models.Entities.Type { Name = "VHS" },
                        new Models.Entities.Type { Name = "Cassette" },
                        new Models.Entities.Type { Name = "MiniDisc" },
                        new Models.Entities.Type { Name = "HD DVD" },
                        new Models.Entities.Type { Name = "USB Drive" }
                    );
                    dbContext.SaveChanges();
                }

                //seeding category type
                if (!dbContext.CategoryTypes.Any())
                {
                    dbContext.AddRange(
                        new CategoryType { CategoryId = 1, TypeId = 1 },
                        new CategoryType { CategoryId = 1, TypeId = 2 },
                        new CategoryType { CategoryId = 2, TypeId = 1 },
                        new CategoryType { CategoryId = 2, TypeId = 3 },
                        new CategoryType { CategoryId = 3, TypeId = 4 },
                        new CategoryType { CategoryId = 3, TypeId = 5 },
                        new CategoryType { CategoryId = 4, TypeId = 6 },
                        new CategoryType { CategoryId = 4, TypeId = 7 },
                        new CategoryType { CategoryId = 5, TypeId = 8 },
                        new CategoryType { CategoryId = 5, TypeId = 9 },
                        new CategoryType { CategoryId = 6, TypeId = 10 }

                    );
                    dbContext.SaveChanges();
                }

                //seeding contact
                if (!dbContext.Contacts.Any())
                {
                    dbContext.AddRange(
                        new Contact { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Subject = "Inquiry", Message = "I would like more information about your services." },
                        new Contact { FirstName = "Jane", LastName = "Smith", Email = "jane.smith@example.com", Subject = "Support", Message = "I need help with my account." },
                        new Contact { FirstName = "Michael", LastName = "Johnson", Email = "michael.johnson@example.com", Subject = "Feedback", Message = "Great service!" },
                        new Contact { FirstName = "Emily", LastName = "Davis", Email = "emily.davis@example.com", Subject = "Complaint", Message = "I am not satisfied with the product." },
                        new Contact { FirstName = "Chris", LastName = "Brown", Email = "chris.brown@example.com", Subject = "Collaboration", Message = "Let's discuss potential collaboration." },
                        new Contact { FirstName = "Sarah", LastName = "Wilson", Email = "sarah.wilson@example.com", Subject = "Job Inquiry", Message = "Are there any open positions?" },
                        new Contact { FirstName = "David", LastName = "Moore", Email = "david.moore@example.com", Subject = "Technical Support", Message = "My software isn't working correctly." },
                        new Contact { FirstName = "Linda", LastName = "Taylor", Email = "linda.taylor@example.com", Subject = "Product Inquiry", Message = "Can you provide more details about your product?" },
                        new Contact { FirstName = "Robert", LastName = "Anderson", Email = "robert.anderson@example.com", Subject = "Billing", Message = "I have a question about my invoice." },
                        new Contact { FirstName = "Jessica", LastName = "Thomas", Email = "jessica.thomas@example.com", Subject = "Event", Message = "Are you available for our upcoming event?" },
                        new Contact { FirstName = "Mark", LastName = "Jackson", Email = "mark.jackson@example.com", Subject = "Partnership", Message = "I would like to discuss a partnership opportunity." }
                    );
                    dbContext.SaveChanges();
                }

                //seeding product
                if (!dbContext.Products.Any())
                {
                    dbContext.AddRange(
                        new Product { Name = "Abbey Road", Description = "Classic album by The Beatles", CategoryId = 1, Price = 19.99, Author = "The Beatles", Quantity = 100 },
                        new Product { Name = "The Dark Side of the Moon", Description = "Album by Pink Floyd", CategoryId = 2, Price = 21.99, Author = "Pink Floyd", Quantity = 80 },
                        new Product { Name = "Thriller", Description = "Album by Michael Jackson", CategoryId = 3, Price = 24.99, Author = "Michael Jackson", Quantity = 90 },
                        new Product { Name = "Back in Black", Description = "Album by AC/DC", CategoryId = 4, Price = 18.99, Author = "AC/DC", Quantity = 75 },
                        new Product { Name = "Hotel California", Description = "Album by Eagles", CategoryId = 5, Price = 22.99, Author = "Eagles", Quantity = 60 },
                        new Product { Name = "Rumours", Description = "Album by Fleetwood Mac", CategoryId = 6, Price = 20.99, Author = "Fleetwood Mac", Quantity = 85 },
                        new Product { Name = "The Wall", Description = "Album by Pink Floyd", CategoryId = 7, Price = 23.99, Author = "Pink Floyd", Quantity = 70 },
                        new Product { Name = "Born to Run", Description = "Album by Bruce Springsteen", CategoryId = 8, Price = 17.99, Author = "Bruce Springsteen", Quantity = 95 },
                        new Product { Name = "Dark Horse", Description = "Album by George Harrison", CategoryId = 2, Price = 16.99, Author = "George Harrison", Quantity = 50 },
                        new Product { Name = "A Night at the Opera", Description = "Album by Queen", CategoryId = 5, Price = 25.99, Author = "Queen", Quantity = 65 },
                        new Product { Name = "Let It Be", Description = "Album by The Beatles", CategoryId = 7, Price = 19.49, Author = "The Beatles", Quantity = 80 },
                        new Product { Name = "The Joshua Tree", Description = "Album by U2", CategoryId = 6, Price = 21.49, Author = "U2", Quantity = 55 }
                    );
                    dbContext.SaveChanges();
                }

                //seeding attachment
                if (!dbContext.Products.Any())
                {
                    dbContext.AddRange(
                        new Product { Name = "Abbey Road", Description = "Classic album by The Beatles", CategoryId = 1, Price = 19.99, Author = "The Beatles", Quantity = 100 },
                        new Product { Name = "The Dark Side of the Moon", Description = "Album by Pink Floyd", CategoryId = 2, Price = 21.99, Author = "Pink Floyd", Quantity = 80 },
                        new Product { Name = "Thriller", Description = "Album by Michael Jackson", CategoryId = 3, Price = 24.99, Author = "Michael Jackson", Quantity = 90 },
                        new Product { Name = "Back in Black", Description = "Album by AC/DC", CategoryId = 4, Price = 18.99, Author = "AC/DC", Quantity = 75 },
                        new Product { Name = "Hotel California", Description = "Album by Eagles", CategoryId = 5, Price = 22.99, Author = "Eagles", Quantity = 60 },
                        new Product { Name = "Rumours", Description = "Album by Fleetwood Mac", CategoryId = 6, Price = 20.99, Author = "Fleetwood Mac", Quantity = 85 },
                        new Product { Name = "The Wall", Description = "Album by Pink Floyd", CategoryId = 7, Price = 23.99, Author = "Pink Floyd", Quantity = 70 },
                        new Product { Name = "Born to Run", Description = "Album by Bruce Springsteen", CategoryId = 8, Price = 17.99, Author = "Bruce Springsteen", Quantity = 95 },
                        new Product { Name = "Dark Horse", Description = "Album by George Harrison", CategoryId = 2, Price = 16.99, Author = "George Harrison", Quantity = 50 },
                        new Product { Name = "A Night at the Opera", Description = "Album by Queen", CategoryId = 5, Price = 25.99, Author = "Queen", Quantity = 65 },
                        new Product { Name = "Let It Be", Description = "Album by The Beatles", CategoryId = 7, Price = 19.49, Author = "The Beatles", Quantity = 80 },
                        new Product { Name = "The Joshua Tree", Description = "Album by U2", CategoryId = 6, Price = 21.49, Author = "U2", Quantity = 55 }
                    );
                    dbContext.SaveChanges();
                }



                //seeding orders
                if (!dbContext.Orders.Any())
                {
                    dbContext.AddRange(
                        new Order { UserId = 2, PaymentMethod = "Credit Card", IsActive = true, Transaction = TransactionStatus.PROCESSING, Total = 120 },
                        new Order { UserId = 2, PaymentMethod = "PayPal", IsActive = true, Transaction = TransactionStatus.DELIVERED, Total = 45 },
                        new Order { UserId = 3, PaymentMethod = "Debit Card", IsActive = false, Transaction = TransactionStatus.PREPARING, Total = 75 },
                        new Order { UserId = 4, PaymentMethod = "Credit Card", IsActive = true, Transaction = TransactionStatus.PROCESSING, Total = 200 },
                        new Order { UserId = 5, PaymentMethod = "Bank Transfer", IsActive = true, Transaction = TransactionStatus.DELIVERED, Total = 55 },
                        new Order { UserId = 6, PaymentMethod = "PayPal", IsActive = false, Transaction = TransactionStatus.DELIVERING, Total = 85 },
                        new Order { UserId = 7, PaymentMethod = "Credit Card", IsActive = true, Transaction = TransactionStatus.PROCESSING, Total = 100 },
                        new Order { UserId = 8, PaymentMethod = "Debit Card", IsActive = true, Transaction = TransactionStatus.DELIVERED, Total = 60 },
                        new Order { UserId = 9, PaymentMethod = "PayPal", IsActive = false, Transaction = TransactionStatus.PREPARING, Total = 130 },
                        new Order { UserId = 10, PaymentMethod = "Credit Card", IsActive = true, Transaction = TransactionStatus.PROCESSING, Total = 90 },
                        new Order { UserId = 7, PaymentMethod = "Bank Transfer", IsActive = true, Transaction = TransactionStatus.DELIVERING, Total = 150 },
                        new Order { UserId = 8, PaymentMethod = "PayPal", IsActive = true, Transaction = TransactionStatus.PROCESSING, Total = 70 }

                    );
                    dbContext.SaveChanges();
                }
                //seeding order items
                if (!dbContext.OrderItems.Any())
                {
                    dbContext.AddRange(
                        new OrderItem { OrderId = 1, Quantity = 2, ProductId = 1, FeedBack = "Great product!", VoteStar = 5 },
                        new OrderItem { OrderId = 1, Quantity = 1, ProductId = 2, FeedBack = "Satisfactory.", VoteStar = 3 },
                        new OrderItem { OrderId = 2, Quantity = 1, ProductId = 3, FeedBack = "Excellent quality.", VoteStar = 4 },
                        new OrderItem { OrderId = 3, Quantity = 2, ProductId = 3, FeedBack = "Not what I expected.", VoteStar = 2 },
                        new OrderItem { OrderId = 4, Quantity = 3, ProductId = 5, FeedBack = "Very pleased with the purchase.", VoteStar = 5 },
                        new OrderItem { OrderId = 5, Quantity = 1, ProductId = 4, FeedBack = "Good value for money.", VoteStar = 4 },
                        new OrderItem { OrderId = 6, Quantity = 2, ProductId = 6, FeedBack = "Delivery was delayed.", VoteStar = 2 },
                        new OrderItem { OrderId = 7, Quantity = 1, ProductId = 7, FeedBack = "Highly recommended.", VoteStar = 5 },
                        new OrderItem { OrderId = 8, Quantity = 4, ProductId = 8, FeedBack = "Quality could be better.", VoteStar = 3 },
                        new OrderItem { OrderId = 9, Quantity = 2, ProductId = 9, FeedBack = "Excellent service.", VoteStar = 5 },
                        new OrderItem { OrderId = 10, Quantity = 3, ProductId = 10, FeedBack = "Satisfied with the product.", VoteStar = 4 },
                        new OrderItem { OrderId = 11, Quantity = 1, ProductId = 5, FeedBack = "Will buy again.", VoteStar = 5 }
                    );
                    dbContext.SaveChanges();
                }

                //seeding order attachments
                if (!dbContext.Attachments.Any())
                {
                    dbContext.AddRange(
                        new Attachment { ProductId = 1, Type = FileType.IMAGE, Path = "/uploads/disc.jpg" },
                        new Attachment { ProductId = 2, Type = FileType.IMAGE, Path = "/uploads/disc.jpg" },
                        new Attachment { ProductId = 3, Type = FileType.IMAGE, Path = "/uploads/disc.jpg" },
                        new Attachment { ProductId = 4, Type = FileType.IMAGE, Path = "/uploads/disc.jpg" },
                        new Attachment { ProductId = 5, Type = FileType.IMAGE, Path = "/uploads/disc.jpg" },
                        new Attachment { ProductId = 6, Type = FileType.IMAGE, Path = "/uploads/disc.jpg" },
                        new Attachment { ProductId = 7, Type = FileType.VIDEO, Path = "/uploads/disc.jpg" },
                        new Attachment { ProductId = 8, Type = FileType.IMAGE, Path = "/uploads/disc.jpg" },
                        new Attachment { ProductId = 9, Type = FileType.IMAGE, Path = "/uploads/disc.jpg" },
                        new Attachment { ProductId = 10, Type = FileType.IMAGE, Path = "/uploads/disc.jpg" },
                        new Attachment { ProductId = 11, Type = FileType.IMAGE, Path = "/uploads/disc.jpg" },
                        new Attachment { ProductId = 12, Type = FileType.IMAGE, Path = "/uploads/disc.jpg" }
                    );
                    dbContext.SaveChanges();
                }
            }
        }
    }
}
