using Bogus;
using DAL;
using DAL.Constants;
using DAL.Entities;
using DAL.Entities.FilterEntities;
using DAL.Entities.Identity;
using DAL.Entities.Music;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using static Bogus.DataSets.Name;
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
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var dbcontext = scope.ServiceProvider.GetRequiredService<AppEFContext>();
                var roleManaager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
                var categoryRepository = scope.ServiceProvider.GetRequiredService<ICategoryRepository>();
                var genreRepository = scope.ServiceProvider.GetRequiredService<IGenreRepository>();
                var productRepository = scope.ServiceProvider.GetRequiredService<IProductRepository>();
                var optionsRepository = scope.ServiceProvider.GetRequiredService<IOptionsRepository>();

                //dbcontext.Database.Migrate();
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
                    result = roleManaager.CreateAsync(new RoleEntity
                    {
                        Name = Roles.Seller
                    }).Result;
                }

                if (!userManager.Users.Any())
                {
                    string admin = "admin@gmail.com";
                    var user = new User
                    {
                        Email = admin,
                        FirstName = admin,
                        DisplayName = "Адмін",
                        UserName = admin,
                        LastName = "Главний",
                    };
                    var result = userManager.CreateAsync(user, "123456").Result;
                    result = userManager.AddToRoleAsync(user, Roles.Admin).Result;
                }

                if(!genreRepository.GetAll().Any())
                {
                    var genres = new List<Genre>();
                    genres.Add(new Genre { Title = "Поп", Description = "Це широкий жанр, який охоплює популярну музику різних стилів. Вона часто має прості мелодії, захоплюючі ритми та акцент на вокал." });

                    genres.Add(new Genre { Title = "Рок", Description = " Енергійний жанр, в якому важливу роль відіграють гітари та барабани. Варіюється від класичного року до хард-року та альтернативи." });


                    genres.Add(new Genre { Title = "Хіп-хоп", Description = " Спільноти у фокусі цього жанру, з акцентом на ритмічні тексти та біти. Стиль може включати рап, ритм-енд-блюз, треп та інше." });

                    genres.Add(new Genre { Title = "Електронна музика", Description = "Створена за допомогою електронних звукових генераторів. Включає в себе стилі від танцювальних ритмів до амбієнту." });

                    genres.Add(new Genre { Title = "Кантрі", Description = "Характеризується гітарними мелодіями, тексти про сільське життя та емоції." });

                    genres.Add(new Genre { Title = "Реггі", Description = "Походить з Ямайки, має релаксований ритм та текстові теми, часто про соціальну справедливість." });

                    genres.Add(new Genre { Title = "Джаз", Description = "Імпровізація та вільна структура - основи цього жанру. Він охоплює різні стилі, від свінгу до ф’южну." });

                    genres.Add(new Genre { Title = "Панк-рок", Description = "Енергійний та бунтарський жанр, який наголошує на простих акордах та прямих тексти." });

                    genres.Add(new Genre { Title = "Емо", Description = "Стримаючись з панк-року, емо-музика відзначається особистими та емоційними тексти, які часто висловлюють невдоволеність або меланхолію. Вона може включати як електрогітари, так і піано." });

                    genres.Add(new Genre { Title = "Поп-панк", Description = "Комбінація поп-музики та панк-року, поп-панк відзначається своїми енергійними мелодіями та тексти, які часто стосуються підліткових тем." });

                    genres.Add(new Genre { Title = "Металкор", Description = "Цей жанр об'єднує елементи металу та хардкору, зазвичай включаючи важкі гітарні рифи та різні вокальні стилі, від чистого співу до скріму." });

                    genres.Add(new Genre { Title = "Пост-рок", Description = "Це експериментальний жанр, який відзначається використанням нестандартних структур та атмосферної музики, часто без вокалу." });

                    genres.Add(new Genre { Title = "Грандж", Description = "Виник у Сіетлі, грандж поєднує елементи альтернативного року, панку та металу, маючи характерний шорохливий звук." });

                    genres.Add(new Genre { Title = "Альтернатива", Description = " Обширний жанр, що включає в себе музику, яка відхиляється від традиційних стилів. Він може включати альтернативний рок, альтернативний поп та інші піджанри." });

                    genres.Add(new Genre { Title = "Інді-рок", Description = " Це жанр, який акцентується на незалежних артистах та більш особистій творчості. Стиль може варіюватися від акустичного до електричного звучання." });

                    foreach(var genre in genres)
                    {
                        await genreRepository.Create(genre);
                    }
                }

                if (!categoryRepository.Categories.Any())
                {
                    var categories = new List<Category>();

                    categories.Add(new Category { Name = "Електроніка" });
                    categories.Add(new Category { Name = "Комп'ютери" });
                    categories.Add(new Category { Name = "Мистецтво" });
                    categories.Add(new Category { Name = "Автомобілі" });
                    categories.Add(new Category { Name = "Діти" });
                    categories.Add(new Category { Name = "Краса та догляд" });
                    categories.Add(new Category { Name = "Мода" });
                    categories.Add(new Category { Name = "Здоров'я" });
                    categories.Add(new Category { Name = "Дім та кухня" });
                    categories.Add(new Category { Name = "Сумки і багаж" });
                    categories.Add(new Category { Name = "Товири для тварин" });
                    categories.Add(new Category { Name = "Спорт на природі" });
                    categories.Add(new Category { Name = "Іграшки" });

                    foreach (var c in categories)
                    {
                        await categoryRepository.Create(c);
                    }

                    var subCategories = new List<Category>();

                    subCategories.Add(new Category { Name = "Аксесуари та витратні матеріали", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Камера та фото", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Автомобільна електроніка", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Стільникові телефони та аксесуари", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "GPS та навігація", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Навушники", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Домашнє аудіо", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Офісна електроніка", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Портативне аудіо та відео", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Безпека та спостереження", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Телебачення та відео", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Ігрові аксесуари", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Відеопроектори", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Годинники", ParentId = categories[0].Id });
                    subCategories.Add(new Category { Name = "Електронні книги", ParentId = categories[0].Id });

                    subCategories.Add(new Category { Name = "Комп'ютерні аксесуари та професійні пристрої", ParentId = categories[1].Id });
                    subCategories.Add(new Category { Name = "Комп'ютерні компоненти", ParentId = categories[1].Id });
                    subCategories.Add(new Category { Name = "Комп'ютерни та планшети", ParentId = categories[1].Id });
                    subCategories.Add(new Category { Name = "Зберігання данних", ParentId = categories[1].Id });
                    subCategories.Add(new Category { Name = "Зовнішні компоненти", ParentId = categories[1].Id });
                    subCategories.Add(new Category { Name = "Аксесуари для ноутбуків", ParentId = categories[1].Id });
                    subCategories.Add(new Category { Name = "Монітори", ParentId = categories[1].Id });
                    subCategories.Add(new Category { Name = "Мережеві продукти", ParentId = categories[1].Id });
                    subCategories.Add(new Category { Name = "Подовжувачі живлення та проистрої захисту від перенапруг", ParentId = categories[1].Id });
                    subCategories.Add(new Category { Name = "Принтери", ParentId = categories[1].Id });
                    subCategories.Add(new Category { Name = "Сканери", ParentId = categories[1].Id });
                    subCategories.Add(new Category { Name = "Аксесуари для планшетів", ParentId = categories[1].Id });
                    subCategories.Add(new Category { Name = "Гарантії та послуги", ParentId = categories[1].Id });

                    subCategories.Add(new Category { Name = "Живопис, креслення та приладдя для мистецтва", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "Виготовлення бісеру та ювельрних виробів", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "Крафт", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "Тканина", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "Тканина", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "Декорування тканини", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "В'ящання спицями та гачком", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "Рукоділля", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "Організація, зберігання та транспотування", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "Естамп", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "Скрапбукінг і тиснення", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "Шиття", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "Прикраси та приладдя для вечірок", ParentId = categories[2].Id });
                    subCategories.Add(new Category { Name = "Засоби для упакування подарунків", ParentId = categories[2].Id });

                    subCategories.Add(new Category { Name = "Догляд за автомобілем", ParentId = categories[3].Id });
                    subCategories.Add(new Category { Name = "Автомобільна електроніка та аксесуари", ParentId = categories[3].Id });
                    subCategories.Add(new Category { Name = "Зовнішні аксесуари ", ParentId = categories[3].Id });
                    subCategories.Add(new Category { Name = "Інтер'єрні аксесуари", ParentId = categories[3].Id });
                    subCategories.Add(new Category { Name = "Світильники та освітлення", ParentId = categories[3].Id });
                    subCategories.Add(new Category { Name = "Мотоцикл і силовий спорт", ParentId = categories[3].Id });
                    subCategories.Add(new Category { Name = "Масла та рідини", ParentId = categories[3].Id });
                    subCategories.Add(new Category { Name = "Фарба", ParentId = categories[3].Id });

                    foreach (var c in subCategories)
                    {
                        await categoryRepository.Create(c);
                    }

                    //var faker = new Faker<Category>()
                    //    .RuleFor(c => c.Name, f => f.Commerce.Department());
                    //List<Category> res = faker.Generate(10);
                    //foreach (var c in res)
                    //{
                    //    await categoryRepository.Create(c);
                    //}

                    //var faker2 = new Faker<Product>()
                    //        .RuleFor(p => p.Category, f => f.PickRandom(res))
                    //        .RuleFor(p => p.Name, f => f.Commerce.ProductName())
                    //        .RuleFor(p => p.Description, f => f.Commerce.ProductDescription());
                    //var res2 = faker2.Generate(100);
                    //Random rnd = new Random();
                    //foreach (var r in res2)
                    //{
                    //    r.Price = rnd.Next(100, 1000000);
                    //}

                    //foreach (var c in res2)
                    //{
                    //    await productRepository.Create(c);
                    //}
                }

                if(!optionsRepository.GetAll().Any())
                {
                    var optionsBrends = new Options { 
                        Title = "Бренди",
                        isBaseOptions = true,
                        Variants = new List<Variant>
                        {
                            new Variant { Title = "Apple"},
                            new Variant { Title = "Samsung"},
                            new Variant { Title = "Lenovo"},
                            new Variant { Title = "BlueBerry"},
                        }
                    };

                    var optionsColors = new Options { 
                        Title = "Кольори",
                        isBaseOptions= true,
                        Variants = new List<Variant>
                        {
                            new Variant { Title = "Чорний"},
                            new Variant { Title = "Білий"},
                            new Variant { Title = "Синій"},
                            new Variant { Title = "Жовтий"},
                            new Variant { Title = "Червоний"},
                            new Variant { Title = "Зелений"},
                            new Variant { Title = "Фіолетовий"},
                            new Variant { Title = "Оранжевий"},
                            new Variant { Title = "Рожевий"},
                            new Variant { Title = "Салатовий"},
                        }
                    };

                    await optionsRepository.Create(optionsBrends);
                    await optionsRepository.Create(optionsColors);

                }

            }
        }
    }
}