using DAL.Entities;
using Infrastructure.Models;


namespace DAL.Interfaces;

public interface IProductRepository : IGenericRepository<ProductEntity, int>
{
    IQueryable<ProductEntity> Products { get; }

    Task<IQueryable<ProductEntity>> SearchProducts(string name);
    Task<ProductEntity> GetByName(string name);
    ICollection<ProductEntity> GetProductsAsync(GetProductsVM model);


}



