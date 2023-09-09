using DAL.Entities;
using DAL.Entities.FilterEntities;
using DAL.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories;

public class ProductRepository : GenericRepository<Product>, IProductRepository
{
    public ProductRepository(AppEFContext context) : base(context)
    {
    }

    public IQueryable<Product> Products => GetAll();

    public Task<IQueryable<Product>> SearchProducts(string name)
    {
        throw new NotImplementedException();
    }

    public async Task<Product> GetByName(string name)
    {
        return await _dbContext.Set<Product>().Include(i=>i.Category)
            .AsNoTracking().FirstOrDefaultAsync(e => e.Name == name);
    }

    private ICollection<Product> GetByCategoryName(string category)
    {
        if (category == "")
        {
            return GetAll().Include(i=>i.Category).ToList();
        }

        return _dbContext.Category.FirstOrDefault(i => i.Name == category)?.Products;
    }

    private ICollection<Product> FilterByName(ICollection<Product> list, string name)
    {
        return list.Where(i =>  i.Name.ToLower().Contains(name.ToLower())).ToList();
    }

    public ICollection<Product> GetProductsAsync(GetProductsVM model)
    {
        int start = model.pageNumber * model.pageSize;
        int end = model.pageSize * model.pageNumber + model.pageSize;
        return FilterByName(GetByCategoryName(model.Category), model.Find).Skip(start).Take(end - start).ToList();
    }
    public ICollection<Product> GetProductsAsync()
    {
        return GetAll().Include(i => i.Category).Include(i=>i.VariantProducts).ToList();
    }


    public async Task RemoveVariantProductsAsync(int productId)
    {
        var vrs = await _dbContext.VariantProduct.Where(vp=>vp.ProductId == productId).ToListAsync();
        _dbContext.VariantProduct.RemoveRange(vrs);
    }

    public async Task AddVariantProductsToProductAsync(int productId, List<int> variantsIds)
    {
        foreach (var variantId in variantsIds)
        {
            var real_variant = await _dbContext.Variant.FindAsync(variantId);

            if (real_variant != null)
            {
                _dbContext.VariantProduct.Add(new VariantProduct { VariantId = variantId, ProductId = productId });
            }
        }
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }

    public async Task RemoveProductImagesAsync(int productId)
    {
        var imgs = await _dbContext.ProductImage.Where(prodImg=>prodImg.ProductId == productId).ToListAsync();
        _dbContext.ProductImage.RemoveRange(imgs);
    }
}