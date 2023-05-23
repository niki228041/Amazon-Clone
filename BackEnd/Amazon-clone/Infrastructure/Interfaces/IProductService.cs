using Infrastructure.Models;
using Services;

namespace Infrastructure.Interfaces;

public interface IProductService
{
     Task<ServiceResponse> GetProductAsync(string name);
     Task<ServiceResponse> GetProductsAsync(GetProductsVM model);
}