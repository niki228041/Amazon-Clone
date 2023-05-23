using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Services;

namespace Infrastructure.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
  
    private readonly IMapper _mapper;
    public ProductService(IProductRepository productRepository, IMapper mapper)
    {
        _productRepository = productRepository;
        _mapper = mapper;
      
    }

    public async Task<ServiceResponse> GetProductAsync(string name)
    {
        var res = await _productRepository.GetByName(name);
        var item = _mapper.Map<ProductEntity, ProductVM>(res);
        //item.Category = res.Category.Name;
        return new ServiceResponse
        {
            Message = "GetProduct",
            IsSuccess = true,
            Payload = item
        };
    }

    public async Task<ServiceResponse> GetProductsAsync(GetProductsVM model)
    {
        ICollection<ProductEntity>? res = _productRepository.GetProductsAsync(model);


        if (res == null)
        {
            return new ServiceResponse
            {
                Message = "GetProducts fail",
                IsSuccess = false,
                Payload = null
            };
        }

        var list = new List<ProductVM>();
        foreach (var p in res)
        {
            var item = _mapper.Map<ProductEntity, ProductVM>(p);
            list.Add(item);
        }

        return new ServiceResponse
        {
            Message = "GetProducts",
            IsSuccess = true,
            Payload = list
        };
    }
}