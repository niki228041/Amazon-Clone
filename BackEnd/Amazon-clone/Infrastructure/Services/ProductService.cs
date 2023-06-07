using AutoMapper;
using DAL.Entities;
using DAL.Entities.DTO_s;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Services;
using System.Collections.Generic;

namespace Infrastructure.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryService _categoryRepository;
  
    private readonly IMapper _mapper;
    public ProductService(IProductRepository productRepository, IMapper mapper, ICategoryService categoryRepository)
    {
        _productRepository = productRepository;
        _mapper = mapper;
        _categoryRepository = categoryRepository;
    }

    public async Task<ServiceResponse> GetProductAsync(string name)
    {
        var res = await _productRepository.GetByName(name);
        var item = _mapper.Map<Product, ProductVM>(res);
        //item.Category = res.Category.Name;
        return new ServiceResponse
        {
            Message = "GetProduct",
            IsSuccess = true,
            Payload = item
        };
    }

    public async Task<ServiceResponse> CreateProductAsync(CreateProductDTO model)
    {
        var product = _mapper.Map<CreateProductDTO, Product>(model);


        //_categoryRepository.
        var category = await _categoryRepository.GetByIdAsync(model.CategoryId);

        product.CategoryId = category.Id;

        if (product != null) { 
            await _productRepository.Create(product);
            return new ServiceResponse
            {
                Message = "CreateProduct",
                IsSuccess = true,
                Payload = product
            };
        }

        return new ServiceResponse
        {
            Message = "CreateProduct",
            IsSuccess = false,
        };

        //item.Category = res.Category.Name;
    }

    public async Task<ServiceResponse> GetProductByIdAsync(int id)
    {
        var res = await _productRepository.GetById(id);
        var item = _mapper.Map<Product, ProductVM>(res);
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
        ICollection<Product>? res = _productRepository.GetProductsAsync(model);


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
            var item = _mapper.Map<Product, ProductVM>(p);
            list.Add(item);
        }

        return new ServiceResponse
        {
            Message = "GetProducts",
            IsSuccess = true,
            Payload = list
        };
    }

    public async Task<ServiceResponse> GetProductsAsync()
    {
        ICollection<Product> res = _productRepository.GetProductsAsync();


       
        var list = new List<ProductVM>();
        foreach (var p in res)
        {
            var item = _mapper.Map<Product, ProductVM>(p);
            list.Add(item);
        }

        return new ServiceResponse
        {
            Message = "GetProducts",
            IsSuccess = true,
            Payload = list
        };
    }

    public async Task DeleteProductAsync(int id)
    {
        await _productRepository.Delete(id);
    }
}