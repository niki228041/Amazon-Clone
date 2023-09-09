using DAL.Entities;
using DAL.Entities.FilterEntities;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;


namespace DAL.Interfaces;

public interface IProductRepository : IGenericRepository<Product, int>
{
    IQueryable<Product> Products { get; }
    Task<IQueryable<Product>> SearchProducts(string name);
    Task<Product> GetByName(string name);
    ICollection<Product> GetProductsAsync(GetProductsVM model);
    ICollection<Product> GetProductsAsync();

    public Task RemoveVariantProductsAsync(int productId);
    public Task RemoveProductImagesAsync(int productId);

    public Task AddVariantProductsToProductAsync(int productId, List<int> variantsIds);

    public Task SaveChangesAsync();

}



