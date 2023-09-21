using DAL;
using DAL.Entities;
using DAL.Entities.Identity;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Interfaces;
using Infrastructure.Models.Mappers;
using Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using ShopApi;
using Infrastructure.Settings;
using Compass.Services.Configurations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using DAL.Constants;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddDbContext<AppEFContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.

builder.Services.AddIdentity<User, RoleEntity>(opt =>
{
    opt.Password.RequireDigit = false;
    opt.Password.RequireNonAlphanumeric = false;
    opt.Password.RequireUppercase = false;
    opt.Password.RequireLowercase = false;
}).AddEntityFrameworkStores<AppEFContext>().AddDefaultTokenProviders();

var googleAuthSettings = builder.Configuration
    .GetSection("GoogleAuthSettings")
    .Get<GoogleAuthSettings>();

builder.Services.AddSingleton(googleAuthSettings);

builder.Services.AddControllers();

builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICategoryImageRepository, CategoryImageRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductImageRepository, ProductImageRepository>();
//builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<EmailService>();
//builder.Services.AddTransient<JwtTokenService>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<ICommentImageRepository, CommentImageRepository>();
builder.Services.AddScoped<IVariantRepository,VariantRepository>();
builder.Services.AddScoped<IOptionsRepository,OptionsRepository>();
builder.Services.AddScoped<IOptionsCategoryRepository,OptionsCategoryRepository>();
builder.Services.AddScoped<IVariantProductRepository, VariantProductRepository>();
builder.Services.AddScoped<IGenreRepository, GenreRepository>();
builder.Services.AddScoped<ITrackRepository, TrackRepository>();
builder.Services.AddScoped<ICardRepository, CardRepository>();
builder.Services.AddScoped<IAddressRepository, AddressRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderedProductRepository, OrderedProductRepository>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<ILikedTracksRepository, LikedTracksRepository>();
builder.Services.AddScoped<ITrackHistoryRepository, TrackHistoryRepository>();
builder.Services.AddScoped<ITrackCommentRepository, TrackCommentRepository>();
builder.Services.AddScoped<ITrackGenreRepository, TrackGenreRepository>();
builder.Services.AddScoped<IFAQRepository, FAQRepository>();
builder.Services.AddScoped<IAnswerFAQRepository, AnswerFAQRepository>();
builder.Services.AddScoped<IAlbumRepository, AlbumRepository>();
builder.Services.AddScoped<IUserFollowerRepository, UserFollowerRepository>();



//Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryImageService, CategoryImageService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductImageService, ProductImageService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<ICommentImageService, CommentImageService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IGenreService, GenreService>();
builder.Services.AddScoped<ITrackService, TrackService>();
builder.Services.AddScoped<ICardService, CardService>();
builder.Services.AddScoped<IAddressService, AddressService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<ILikedTracksService, LikedTracksService>();
builder.Services.AddScoped<ITrackHistoryService, TrackHistoryService>();
builder.Services.AddScoped<ITrackCommentService, TrackCommentService>();
builder.Services.AddScoped<IFAQService, FAQService>();
builder.Services.AddScoped<IAnswerFAQService, AnswerFAQService>();
builder.Services.AddScoped<IAlbumService, AlbumService>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
AutoMapperConfiguration.Config(builder.Services);


builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection("JwtConfig"));
var key = Encoding.UTF8.GetBytes(builder.Configuration["JwtConfig:Secret"]);
var tokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(key),
    ValidateIssuer = false,
    ValidateAudience = false,
    ValidateLifetime = false,
    RequireExpirationTime = false,
    ClockSkew = TimeSpan.Zero
};

builder.Services.AddSingleton(tokenValidationParameters);

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(jwt => {
    jwt.SaveToken = true;
    jwt.TokenValidationParameters = tokenValidationParameters;
});

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAllOrigins",
//        builder =>
//        {
//            builder.AllowAnyOrigin()
//                   .AllowAnyHeader()
//                   .AllowAnyMethod()
//                   .AllowCredentials();
//        });
//});


var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}
app.UseAuthentication();
app.UseAuthorization();


string[] directoriesToCreate = {
    DirectoriesInProject.ProductImages,
    DirectoriesInProject.CommentImages,
    DirectoriesInProject.MusicImages,
    DirectoriesInProject.MusicFiles,
    DirectoriesInProject.CompanyImages
};

// Создание директорий, если они не существуют
foreach (var directoryName in directoriesToCreate)
{
    var dir = Path.Combine(Directory.GetCurrentDirectory(), directoryName);
    if (!Directory.Exists(dir))
        Directory.CreateDirectory(dir);

    // Настройка статических файлов
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(dir),
        RequestPath = "/" + directoryName
    });
}





app.UseCors(options => options
    //.WithOrigins("http://localhost:3000", "http://localhost:4200")
    .AllowAnyOrigin()
    .AllowAnyHeader()
    //.AllowCredentials()
    .AllowAnyMethod()
);


app.UseCors("AllowAllOrigins");

app.MapControllers();

app.SeedData();

app.Run();


