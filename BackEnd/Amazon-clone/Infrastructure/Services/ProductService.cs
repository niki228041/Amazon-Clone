using AutoMapper;
using DAL.Entities;
using DAL.Entities.DTO_s;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Services;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace Infrastructure.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryService _categoryService;
    private readonly IProductImageService _productImageService;
    private readonly IProductImageRepository _productImageRepository;

    private readonly IMapper _mapper;
    public ProductService(IProductRepository productRepository, IMapper mapper, ICategoryService categoryRepository, IProductImageService productImageService, IProductImageRepository productImageRepository)
    {
        _productRepository = productRepository;
        _mapper = mapper;
        _categoryService = categoryRepository;
        _productImageService = productImageService;
        _productImageRepository = productImageRepository;
    }

    public async Task<ServiceResponse> GetProductAsync(string name)
    {
        var res = await _productRepository.GetByName(name);
        var item = _mapper.Map<Product, ProductVM>(res);



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
        var category = await _categoryService.GetByIdAsync(model.CategoryId);

        product.CategoryId = category.Id;


        bool isFirstPicture = true;

        if (product != null)
        {
            await _productRepository.Create(product);


            foreach (var img in model.Images_)
            {
                var imgTemplate = img.Data;
                var imgFileName = await _productImageService.SaveImageAsync(imgTemplate);
                ProductImage new_img_to_upload = new ProductImage { Name = imgFileName, ProductId = product.Id };

                if (isFirstPicture == true)
                {
                    new_img_to_upload.IsMainImage = true;
                    isFirstPicture = false;
                }

                await _productImageService.CreateProductImageAsync(new_img_to_upload);
            }

            return new ServiceResponse
            {
                Message = "CreateProduct",
                IsSuccess = true,
                Payload = "ok"
            };
        }

        


        

        return new ServiceResponse
        {
            Message = "CreateProduct",
            IsSuccess = false,
        };

        //item.Category = res.Category.Name;
    }

    public async Task<string> UploadImage(string data)
    {
        string fileName = string.Empty;

        try
        {
            if (data != null)
            {
                var fileExp = "png";
                var dir = Path.Combine(Directory.GetCurrentDirectory(), "images");
                fileName = string.Format(@"{0}" + fileExp, Guid.NewGuid());


                byte[] byteBuffer = Convert.FromBase64String(data);
                System.IO.File.WriteAllBytes(Path.Combine(dir, fileName), byteBuffer);
            }
        }
        catch (Exception ex)
        {

        }

        return fileName;
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

            var mainImage = await _productImageService.GetMainImageByIdAsync(item.Id);

            if(mainImage != null)
            item.Image = _productImageService.GetBase64ByName(mainImage.Name);

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
        var toDelete = _productImageRepository.GetAll().Where(img => img.ProductId == id).ToList();
        toDelete.ForEach(img => _productImageRepository.Delete(img.Id));

        await _productRepository.Delete(id);
    }

    public async Task<ServiceResponse> GetProductByCategoryId(int id)
    {
        var categories = await _categoryService.GetAllSubcategoriesByCategoryId(id);
        var categories_vms = (List<CategoryVM>)categories;


        List<Product> res = _productRepository.GetProductsAsync().ToList();
        List<ProductVM> res_to_send = new List<ProductVM>();



        if (categories != null)
        {
            for (int i = 0; i < res.Count; i++)
            {
                Product product = res[i];
                if (product.CategoryId == id || categories_vms.Find(categ => categ.Id == product.CategoryId) != null)
                {
                    var item = _mapper.Map<Product, ProductVM>(product);

                    var mainImage = await _productImageService.GetMainImageByIdAsync(item.Id);

                    if (mainImage != null)
                        item.Image = _productImageService.GetBase64ByName(mainImage.Name);

                    res_to_send.Add(item);
                }
            }

            return new ServiceResponse
            {
                Message = "GetProducts",
                IsSuccess = true,
                Payload = res_to_send
            };
        }
        else
        {
            var list_with_prod_vms = _mapper.Map<List<Product>, List<ProductVM>>(res);
            foreach (var p in list_with_prod_vms)
            {
                var mainImage = await _productImageService.GetMainImageByIdAsync(p.Id);
                if (mainImage != null)
                    p.Image = _productImageService.GetBase64ByName(mainImage.Name);
            }

            return new ServiceResponse
            {
                Message = "GetProducts without category sort",
                IsSuccess = true,
                Payload = list_with_prod_vms
            };
        }
    }
}