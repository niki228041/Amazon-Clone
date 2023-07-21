using AutoMapper;
using DAL.Constants;
using DAL.Entities;
using DAL.Entities.DTO_s;
using DAL.Entities.FilterEntities;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Enum_s;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Services;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace Infrastructure.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryService _categoryService;
    private readonly IImageService _imageService;
    private readonly IProductImageService _productImageService;
    private readonly IProductImageRepository _productImageRepository;
    private readonly ICommentService _commentService;
    private readonly IVariantRepository _variantRepository;
    private readonly IOptionsRepository _optionsRepository;
    private readonly IVariantProductRepository _variantProductRepository;

    private readonly IMapper _mapper;
    public ProductService(IProductRepository productRepository, IMapper mapper, ICategoryService categoryRepository, IImageService ImageService,IProductImageService productImageService
        , IProductImageRepository productImageRepository, ICommentService commentService,
        IVariantProductRepository variantProductRepository, IVariantRepository variantRepository, IOptionsRepository optionsRepository)
    {
        _productRepository = productRepository;
        _mapper = mapper;
        _categoryService = categoryRepository;
        _imageService = ImageService;
        _productImageService = productImageService;
        _productImageRepository = productImageRepository;
        _commentService = commentService;
        _variantProductRepository = variantProductRepository;
        _variantRepository = variantRepository;
        _optionsRepository = optionsRepository;
    }


    public async Task DeleteProductAsync(int id)
    {
        var toDelete = _productImageRepository.GetAll().Where(img => img.ProductId == id).ToList();
        toDelete.ForEach(img => _productImageRepository.Delete(img.Id));

        await _productRepository.Delete(id);
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
            //add product to variant
            foreach (var variant in model.Variants_)
            {
                var tmp_variant = await _variantRepository.GetById(variant.Id);
                product.Variants.Add(tmp_variant);
                
                await _variantProductRepository.Create(new VariantProduct { VariantId=variant.Id,ProductId=product.Id});
                await _productRepository.Update(product);
            }

            foreach (var img in model.Images_)
            {
                var imgTemplate = img.Data;
                var imgFileName = await _imageService.SaveImageAsync(imgTemplate,DirectoriesInProject.ProductImages);
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
        var res = _productRepository.GetAll().Include(prod=>prod.Variants).FirstOrDefault(prod=>prod.Id==id);
        var optionsToSend = new List<SelectedOptionVM>();

        foreach (var variant in res.Variants)
        {
            var options = _optionsRepository.GetAll().FirstOrDefault(opt=>opt.Id==variant.OptionsId);
            if(options!=null)
            optionsToSend.Add(new SelectedOptionVM { Title = options.Title, Variant = variant.Title, VariantId = variant.Id });
        }

        var item = _mapper.Map<Product, ProductVM>(res);
        item.Options= optionsToSend;

        var images = await _productImageService.GetAllImageByProductIdAsync(item.Id);
        var images_with_base64_list = new List<ProductImageVM>();

        foreach (var img in images)
        {
            var img_base64 = _productImageService.GetBase64ByName(img.Name,Qualities.QualitiesSelector.HIGH);
            ProductImageVM img_vm = _mapper.Map<ProductImage, ProductImageVM>(img);
            img_vm.Image = img_base64;
            images_with_base64_list.Add(img_vm);
        }


        if (images != null)
            item.Image = images_with_base64_list;
        //item.Category = res.Category.Name;

        return new ServiceResponse
        {
            Message = "GetProduct",
            IsSuccess = true,
            Payload = item
        };
    }

    public async Task<ServiceResponse> GetProductByFiltersAsync(FilterVM model)
    {
        var res =  await GetProductByCategoryId(model.CategoryId);
        var res_2 = (List<ProductVM>)res.Payload;
        //var category_options = await _categoryService.GetCategoryOptionsAsyncByCategoryId(model.CategoryId);
        var productVMs = new List<ProductVM>();


        //foreach (var product in res_2)
        //{
        //    foreach(var variant in product.Variants)
        //    {
        //        foreach(var chousedVariants in model.Variants)
        //        {
        //            if (variant.Title == chousedVariants.Title)
        //            {
        //                productVMs.Add(product);
        //            }
        //        }
        //    }
        //}

        return new ServiceResponse
        {
            Message = "GetProduct",
            IsSuccess = true,
            Payload = productVMs
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
            item.Image = _productImageService.GetBase64ByName(mainImage.Name,Qualities.QualitiesSelector.LOW);

            list.Add(item);
        }

        return new ServiceResponse
        {
            Message = "GetProducts",
            IsSuccess = true,
            Payload = list
        };
    }


    public async Task<ServiceResponse> GetProductByCategoryId(int id)
    {
        var categories = await _categoryService.GetAllSubcategoriesByCategoryId(id);
        var categories_vms = categories;


        List<Product> res = _productRepository.GetAll().Include(prod=>prod.Variants).ToList();
        List<ProductVM> res_to_send = new List<ProductVM>();



        if (categories != null)
        {
            for (int i = 0; i < res.Count; i++)
            {
                Product product = res[i];
                if (product.CategoryId == id || categories_vms.Find(categ => categ.Id == product.CategoryId) != null)
                {
                    var comments = await _commentService.GetCommentsByProductIdAsync(product.Id);
                    var item = _mapper.Map<Product, ProductVM>(product);

                    var mainImage = await _productImageService.GetMainImageByIdAsync(item.Id);

                    item.Comments = comments;

                    if (mainImage != null)
                        item.Image = _productImageService.GetBase64ByName(mainImage.Name,Qualities.QualitiesSelector.LOW);

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
                var comments = await _commentService.GetCommentsByProductIdAsync(p.Id);
                var mainImage = await _productImageService.GetMainImageByIdAsync(p.Id);

                p.Comments = comments;
                if (mainImage != null)
                    p.Image = _productImageService.GetBase64ByName(mainImage.Name, Qualities.QualitiesSelector.LOW);
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