using DAL_.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL_.Interfaces
{
    public interface IProductRepository : IGenericRepository<ProductEntity, int>
    {
        IQueryable<ProductEntity> Products { get; }

        Task<IQueryable<ProductEntity>> SearchProducts(string name);
        Task<ProductEntity> GetByName(string name);
        ICollection<ProductEntity> GetProductsAsync(GetProductsVM model);


    }
}
