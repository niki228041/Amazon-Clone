using DAL.Entities;
using DAL.Entities.DTO_s;
using Infrastructure.Models;
using Services;

namespace Infrastructure.Interfaces;

public interface IProductService
{
    Task<ServiceResponse> GetProductAsync(string name);
    Task<ServiceResponse> GetProductByIdAsync(int id);
    Task<ServiceResponse> CreateProductAsync(CreateProductDTO model);
    Task<ServiceResponse> GetProductsAsync(GetProductsVM model);
    Task<ServiceResponse> GetProductCountAsync();
    Task<ServiceResponse> GetProductsAsync();
    Task<ServiceResponse> GetProductByCategoryIdWithPagination(GetProductsWithPaginationAndByCategoryIdDTO model);
    Task DeleteProductAsync(int id);
    Task<ServiceResponse> GetProductWithLimitByCategoryIdAsync(RecomendedProductDTO model);
    public Task<ServiceResponse> GetProductByFiltersAsync(FilterVM model);

}