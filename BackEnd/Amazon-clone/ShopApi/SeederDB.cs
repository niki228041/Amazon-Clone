using Bogus;
using DAL.Entities;
using DAL.Entities.Identity;
using DAL.Interfaces;
using DAL.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Primitives;
using ShopApi.Constants;
using static System.Int32;

namespace ShopApi
{
    public static class SeederDB
    {
        public static async void SeedData(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices
                       .GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
                var roleManaager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
                var categoryRepository = scope.ServiceProvider.GetRequiredService<ICategoryRepository>();
                var productRepository = scope.ServiceProvider.GetRequiredService<IProductRepository>();

                if (!roleManaager.Roles.Any())
                {
                    var result = roleManaager.CreateAsync(new RoleEntity
                    {
                        Name = Roles.Admin
                    }).Result;
                    result = roleManaager.CreateAsync(new RoleEntity
                    {
                        Name = Roles.User
                    }).Result;
                }

                if (!userManager.Users.Any())
                {
                    string admin = "admin@gmail.com";
                    var user = new UserEntity
                    {
                        Email = admin,
                        UserName = admin,
                        LastName = "Главний"
                    };
                    var result = userManager.CreateAsync(user, "123456").Result;
                    result = userManager.AddToRoleAsync(user, Roles.Admin).Result;
                }


                if (!categoryRepository.Categories.Any())
                {
                    var faker = new Faker<CategoryEntity>()
                        .RuleFor(c => c.Name, f => f.Commerce.Department());
                    List<CategoryEntity> res = faker.Generate(10);
                    foreach (var c in res)
                    {
                        await categoryRepository.Create(c);
                    }
                
                    var faker2 = new Faker<ProductEntity>()
                            .RuleFor(p => p.Category, f => f.PickRandom(res))
                            .RuleFor(p => p.Name, f => f.Commerce.ProductName())
                            .RuleFor(p => p.Description, f => f.Commerce.ProductDescription())
                            .RuleFor(p => p.ShortDescription, f => f.Commerce.ProductDescription())
                            .RuleFor(p => p.Manufacturer, f => f.Company.CompanyName())
                        ;
                    var res2 = faker2.Generate(100);
                    Random rnd = new Random();
                    foreach (var r in res2)
                    {
                        r.Price = rnd.Next(100, 1000000);
                    }
                
                    foreach (var c in res2)
                    {
                        await productRepository.Create(c);
                    }
                }

            }
        }
    }
}