using DAL.Entities;
using DAL.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories;

public class ProductRepository : GenericRepository<ProductEntity>, IProductRepository
{
    public ProductRepository(AppEFContext context) : base(context)
    {
    }

    public IQueryable<ProductEntity> Products => GetAll();

    public Task<IQueryable<ProductEntity>> SearchProducts(string name)
    {
        throw new NotImplementedException();
    }

    public async Task<ProductEntity> GetByName(string name)
    {
        return await _dbContext.Set<ProductEntity>().Include(i=>i.Category)
            .AsNoTracking().FirstOrDefaultAsync(e => e.Name == name);
    }

    private ICollection<ProductEntity> GetByCategoryName(string category)
    {
        if (category == "")
        {
            return GetAll().Include(i=>i.Category).ToList();
        }

        return _dbContext.Categories.FirstOrDefault(i => i.Name == category)?.Products;
    }

    private ICollection<ProductEntity> FilterByName(ICollection<ProductEntity> list, string name)
    {
        return list.Where(i =>  i.Name.ToLower().Contains(name.ToLower())).ToList();
    }

    public ICollection<ProductEntity> GetProductsAsync(GetProductsVM model)
    {
        int start = model.pageNumber * model.pageSize;
        int end = model.pageSize * model.pageNumber + model.pageSize;
        return FilterByName(GetByCategoryName(model.Category), model.Find).Skip(start).Take(end - start).ToList();
    }
}