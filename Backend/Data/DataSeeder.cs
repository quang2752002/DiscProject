
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
            using (var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>())
            {
                if (roleManager.Roles.Count() == 0)
                {
                    string[] roleNames = { RoleName.ADMIN, RoleName.CUSTOMER };

                    foreach (var roleName in roleNames)
                    {
                        // Create the role
                        var role = new IdentityRole<int>(roleName);
                        roleManager.CreateAsync(role).Wait();
                    }
                }
            }
            using (var dbContext = serviceProvider.GetRequiredService<ApplicationDbContext>())
            {
                if (!dbContext.Categories.Any())
                {
                    dbContext.AddRange(
                        new Category
                        {
                            Name = "Vietnam"
                        },
                        new Category
                        {
                            Name = "Asia"
                        },
                        new Category
                        {
                            Name = "Euro"
                        },
                        new Category
                        {
                            Name = "Africa"
                        },
                        new Category
                        {
                            Name = "America"
                        }
                    );
                    dbContext.SaveChanges();
                }

                if (!dbContext.Types.Any())
                {
                    dbContext.AddRange(
                        new Models.Entities.Type
                        {
                            Name = "Vietnam"
                        },
                        new Models.Entities.Type
                        {
                            Name = "Asia"
                        },
                        new Models.Entities.Type
                        {
                            Name = "Euro"
                        },
                        new Models.Entities.Type
                        {
                            Name = "Africa"
                        },
                        new Models.Entities.Type
                        {
                            Name = "America"
                        }
                    );
                    dbContext.SaveChanges();
                }


            }
        }
    }
}
