using DAL.Entities;
using Infrastructure.Models;


namespace DAL.Interfaces;

public interface IProductRepository : IGenericRepository<Product, int>
{
    IQueryable<Product> Products { get; }

    Task<IQueryable<Product>> SearchProducts(string name);
    Task<Product> GetByName(string name);
    ICollection<Product> GetProductsAsync(GetProductsVM model);


}



