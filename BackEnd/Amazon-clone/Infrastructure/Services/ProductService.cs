using AutoMapper;
using DAL.Constants;
using DAL.Entities;
using DAL.Entities.DTO_s;
using DAL.Entities.FilterEntities;
using DAL.Interfaces;
using DAL.Migrations;
using DAL.Repositories;
using Infrastructure.Enum_s;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Services;
using System.Collections.Generic;
using System.Globalization;
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
    private readonly IUserRepository _userRepository;
    private readonly ICompanyRepository _companyRepository;
    private readonly IOrderRepository _orderRepository;

    private readonly IMapper _mapper;
    public ProductService(IProductRepository productRepository, IMapper mapper, ICategoryService categoryRepository, IImageService ImageService,IProductImageService productImageService
        , IProductImageRepository productImageRepository, ICommentService commentService,
        IVariantProductRepository variantProductRepository, IVariantRepository variantRepository, IOptionsRepository optionsRepository, IUserRepository userRepository, ICompanyRepository companyRepository,IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository; 
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
        _userRepository = userRepository;
        _companyRepository = companyRepository;
    }


    public async Task DeleteProductAsync(int id)
    {
        var toDelete = _productRepository.GetAll().Where(prod => prod.Id == id).Include(prod => prod.Comments).Include(prod => prod.VariantProducts).Include(prod=>prod.ProductImages).Include(prod=>prod.OrderedProducts).FirstOrDefault();

        await _productRepository.Delete(toDelete);
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

        if(category == null)
        {
            return new ServiceResponse
            {
                Message = "Select Category for Product!",
                IsSuccess = false,
            };
        }

        var user = await _userRepository.GetUserByIdAsync(model.UserId.ToString());
        var roles = await _userRepository.GetRolesAsync(user);

        if (user == null)
        {
            return new ServiceResponse
            {
                Message = "You need to login at first!",
                IsSuccess = false,
            };
        }

        product.CategoryId = category.Id;

        if (user.CompanyId == null)
        {
            return new ServiceResponse
            {
                Message = "You need to have a Comapany!",
                IsSuccess = false,
            };
        }
        //if (!roles.Contains(Roles.Seller))
        //{
        //    return new ServiceResponse
        //    {
        //        Message = "You need to be a Seller (you can check if you'r a Seller in your Profile)!",
        //        IsSuccess = false,
        //    };
        //}

        product.CompanyId = user.CompanyId;



        bool isFirstPicture = true;

        if (product != null)
        {
            await _productRepository.Create(product);
            //add product to variant
            foreach (var variant in model.Variants_)
            {
                var tmp_variant = await _variantRepository.GetById(variant.Id);
                //product.Variants.Add(tmp_variant);
                
                await _variantProductRepository.Create(new VariantProduct { VariantId=variant.Id,ProductId=product.Id});
                await _productRepository.Update(product);
            }

            foreach (var img in model.Images_)
            {
                var imgTemplate = img.Data;
                var imgFileName = await _imageService.SaveImageAsync(imgTemplate,DirectoriesInProject.ProductImages);
                
                if (string.IsNullOrEmpty(imgFileName))
                {
                    return new ServiceResponse
                    {
                        Message = "Error with image, may be wrong format!",
                        IsSuccess = false,
                    };
                }


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
                Message = "Product was created",
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
        if (id == 0)
        {
            return new ServiceResponse
            {
                Message = "ERROR",
                IsSuccess = false,
                Payload = ""
            };
        }

        var res = _productRepository.GetAll().Include(prod=>prod.VariantProducts).Include(prod=>prod.Comments).FirstOrDefault(prod=>prod.Id==id);
        var optionsToSend = new List<SelectedOptionVM>();

        
        if(res != null)
        foreach (var variantProduct in res.VariantProducts)
        {
            var variant = await _variantRepository.GetById((int)variantProduct.VariantId);
            var options = _optionsRepository.GetAll().FirstOrDefault(opt=>opt.Id==variant.OptionsId);
            if (options!=null)
            optionsToSend.Add(new SelectedOptionVM { Title = options.Title, Variant = variant.Title, VariantId = variant.Id });
        }

        var item = _mapper.Map<Product, ProductOneVM>(res);


        if(res.CompanyId != null)
        {
            var company = await _companyRepository.GetById((int)res.CompanyId);
            var companyVm = _mapper.Map<Company, CompanyVM>(company);
            item.CompanyVM = companyVm;
        }
        
        item.Options = optionsToSend;

        var selledProductCount = _orderRepository.GetAll().Include(order=>order.OrderedProducts).Where(order=>order.OrderedProducts.FirstOrDefault(prod=>prod.ProductId == item.Id) != null && order.isBought).ToList().Count;

        item.SelledCount = selledProductCount;

        return new ServiceResponse
        {
            Message = "GetProduct",
            IsSuccess = true,
            Payload = item
        };
    }

    enum FindPreis
    {
        MIN,
        MAX
    }

    public async Task<ServiceResponse> GetProductByFiltersAsync(FilterVM model)
    {
       
        var res =  await GetProductByCategoryId(model.CategoryId);
        var res_2 = (List<ProductVM>)res.Payload;
        var res_3 = new List<ProductVM>();
        //var category_options = await _categoryService.GetCategoryOptionsAsyncByCategoryId(model.CategoryId);
        var productVMs = new List<ProductVM>();

        
        var findPreisBy = new List<FindPreis>();

        if (model.Min_Preis > 0)
        {
            findPreisBy.Add(FindPreis.MIN);
        }

        if (model.Max_Preis > 0)
        {
            findPreisBy.Add(FindPreis.MAX);
        }

        if(findPreisBy.Count > 1 && model.Max_Preis < model.Min_Preis)
        {
            findPreisBy.Clear();
        }



        if (findPreisBy.Count > 0)
        {
            foreach (var productVM in res_2)
            {
                if (findPreisBy.Contains(FindPreis.MAX) && findPreisBy.Contains(FindPreis.MIN))
                {
                    if (model.Min_Preis <= productVM.Price && model.Max_Preis >= productVM.Price)
                    {
                        res_3.Add(productVM);
                    }
                }
                else if (findPreisBy.Contains(FindPreis.MAX))
                {
                    if (model.Max_Preis >= productVM.Price)
                    {
                        res_3.Add(productVM);
                    }
                }
                else if (findPreisBy.Contains(FindPreis.MIN))
                {
                    if (model.Min_Preis <= productVM.Price)
                    {
                        res_3.Add(productVM);
                    }
                }
            }
        }
        else
        {
            res_3 = res_2;
        }

        var tmp = 0;

        if(model.Stars> 0)
        res_3 = res_3.FindAll(prod => prod.Comments.Any() && prod.Comments.Average(c => c.stars) >= model.Stars).ToList();
        
        if(!string.IsNullOrWhiteSpace(model.ProductName))
        res_3 = res_3.FindAll(prod => prod.Name.Contains(model.ProductName));

        if (model.Variants.Count > 0)
        {
            foreach (var product in res_3)
            {
                bool isValid = false;
                if (product.Options != null)
                    foreach (var variant in product.Options)
                    {
                        if (isValid) { break; }

                        foreach (var chousedVariants in model.Variants)
                        {
                            if (isValid) { break; }

                            if (variant.VariantId == chousedVariants.Id)
                            {
                                productVMs.Add(product);
                                isValid = true;
                            }
                        }
                    }
                else
                {
                    //productVMs.Add(product);
                }
            }
        }
        else
        {
            productVMs = res_3;
        }

        switch (model.SortBy)
        {
            case "Рейтингом":
                productVMs = productVMs
            .OrderByDescending(p => p.Comments.Any() ? p.Comments.Average(com => com.stars) : 0)
            .ToList(); break;
            case "Назвою": productVMs = productVMs.OrderBy(p => p.Name).ToList(); break;
            case "Ціною": productVMs = productVMs.OrderBy(p => p.Price).ToList(); break;
        }


        var page = model.Page;
        var limit = model.Limit;

        var startIndex = (page - 1) * limit;
        var endIndex = page * limit;



        List<ProductVM> productVMsFinal = productVMs
            .Skip(startIndex)
            .Take(limit)
            .ToList();

        foreach(var productVM in productVMsFinal)
        {
            productVM.SelledCount = _orderRepository.GetAll().Include(order => order.OrderedProducts).Where(order => order.OrderedProducts.FirstOrDefault(prod => prod.ProductId == productVM.Id) != null && order.isBought).ToList().Count;
        }
        

        ProductsVMWithPagination productsVMWithPagination = new ProductsVMWithPagination();

        productsVMWithPagination.CountOfProducts = productVMs.Count;
        productsVMWithPagination.Products = productVMsFinal;




        return new ServiceResponse
        {
            Message = "GetProduct",
            IsSuccess = true,
            Payload = productsVMWithPagination
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

    public async Task<ServiceResponse> GetProductByCategoryIdWithPagination(GetProductsWithPaginationAndByCategoryIdDTO model)
    {
        var categories = await _categoryService.GetAllSubcategoriesByCategoryId(model.Id);
        var categories_vms = categories;

        var page = model.Page;
        var limit = model.Limit;

        var startIndex = (page-1) * limit;
        var endIndex = page * limit;


        List<Product> res = _productRepository.GetAll()
            .Include(prod=>prod.VariantProducts)
            .Skip(startIndex)
            .Take(limit)
            .ToList();
        List<ProductVM> res_to_send = new List<ProductVM>();



        if (categories != null)
        {
            for (int i = 0; i < res.Count; i++)
            {
                Product product = res[i];
                if (product.CategoryId == model.Id || categories_vms.Find(categ => categ.Id == product.CategoryId) != null)
                {
                    var comments = await _commentService.GetCommentsByProductIdAsync(product.Id);
                    var item = _mapper.Map<Product, ProductVM>(product);

                    //var mainImage = await _productImageService.GetMainImageByIdAsync(item.Id);

                    item.Comments = comments;

                    //if (mainImage != null)
                    //    item.Image = _productImageService.GetBase64ByName(mainImage.Name,Qualities.QualitiesSelector.LOW);

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
                //var mainImage = await _productImageService.GetMainImageByIdAsync(p.Id);

                p.Comments = comments;
                //if (mainImage != null)
                //    p.Image = _productImageService.GetBase64ByName(mainImage.Name, Qualities.QualitiesSelector.LOW);
            }

            return new ServiceResponse
            {
                Message = "GetProducts without category sort",
                IsSuccess = true,
                Payload = list_with_prod_vms
            };
        }
    }

    public async Task<ServiceResponse> GetProductByCategoryId(int id)
    {
        var categories = await _categoryService.GetAllSubcategoriesByCategoryId(id);
        var categories_vms = categories;


        List<Product> res = _productRepository.GetAll()
            .Include(prod => prod.VariantProducts)
            .Include(prod => prod.Category)
            .ToList();
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
                    item.Options = new List<SelectedOptionVM>();
                    item.Options.AddRange(product.VariantProducts.Select(oneProd => new SelectedOptionVM { VariantId = (int)oneProd.VariantId }));
                    //var mainImage = await _productImageService.GetMainImageByIdAsync(item.Id);

                    item.Comments = comments;

                    //if (mainImage != null)
                    //    item.Image = _productImageService.GetBase64ByName(mainImage.Name,Qualities.QualitiesSelector.LOW);

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
            var list_with_prod_vms = new List<ProductVM>();

            for (int i = 0; i < res.Count; i++)
            {
                Product product = res[i];
                var comments = await _commentService.GetCommentsByProductIdAsync(product.Id);
                var item = _mapper.Map<Product, ProductVM>(product);
                item.Options = new List<SelectedOptionVM>();
                item.Options.AddRange(product.VariantProducts.Select(oneProd => new SelectedOptionVM { VariantId = (int)oneProd.VariantId }));
                //var mainImage = await _productImageService.GetMainImageByIdAsync(item.Id);

                item.Comments = comments;

                //if (mainImage != null)
                //    item.Image = _productImageService.GetBase64ByName(mainImage.Name,Qualities.QualitiesSelector.LOW);

                list_with_prod_vms.Add(item);
            }


            return new ServiceResponse
            {
                Message = "GetProducts without category sort",
                IsSuccess = true,
                Payload = list_with_prod_vms
            };
        }
    }

    public async Task<ServiceResponse> GetProductCountAsync()
    {
        int res = _productRepository.GetAll().Count();

        return new ServiceResponse
        {
            Message = "Products Count",
            IsSuccess = true,
            Payload = res
        };
    }

    public async Task<ServiceResponse> GetProductWithLimitByCategoryIdAsync(RecomendedProductDTO model)
    {
        var payload = await GetProductByCategoryId(model.CategoryId);
        var productsVms = (List<ProductVM>)payload.Payload!;

        var random = new Random();
        var randomProducts = productsVms.OrderBy(x => random.Next())
                                        .Take(model.Limit)
                                        .ToList();


        if (payload.Payload == null || payload == null || productsVms == null)
        {
            return new ServiceResponse
            {
                Message = "No recomended products",
                IsSuccess = false,
                Payload = ""
            };
        }

        return new ServiceResponse
        {
            Message = "Recomended products",
            IsSuccess = true,
            Payload = randomProducts
        };
    }

    public async Task<ServiceResponse> EditProductAsync(EditProductDTO model)
    {
        var oldProduct = await _productRepository.GetById(model.ProductId);



        var product = _mapper.Map(model, oldProduct);

        bool isFirstPicture = true;

        var variantsIds = new List<int>(); 
        model.Variants_.ForEach(vr=> variantsIds.Add(vr.Id));

        if (product != null)
        {
            await _productRepository.RemoveVariantProductsAsync(product.Id);
            await _productRepository.AddVariantProductsToProductAsync(product.Id, variantsIds);
            await _productRepository.RemoveProductImagesAsync(product.Id);
            await _productRepository.Update(product);
            await _productRepository.SaveChangesAsync();

            foreach (var img in model.Images_)
            {
                var imgTemplate = img.Data;
                var imgFileName = await _imageService.SaveImageAsync(imgTemplate, DirectoriesInProject.ProductImages);

                if (string.IsNullOrEmpty(imgFileName))
                {
                    return new ServiceResponse
                    {
                        Message = "Проблема з форматом картинки!",
                        IsSuccess = false,
                    };
                }


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
                Message = "Продукт був успішно оновлений!",
                IsSuccess = true,
                Payload = "ok"
            };
        }


        return new ServiceResponse
        {
            Message = "Продукт не був успішно оновлений!!!",
            IsSuccess = false,
        };
    }

    public async Task<ServiceResponse> GetProductWithLimitByUserIdAsync(GetProductsWithPaginationAndByUserIdDTO model)
    {

        var page = model.Page;
        var limit = model.Limit;

        var startIndex = (page - 1) * limit;
        var endIndex = page * limit;


        List<Product> res = _productRepository.GetAll()
            .Include(prod => prod.VariantProducts)
            .Where(prod=>prod.UserId == model.Id)
            .Skip(startIndex)
            .Take(limit)
            .ToList();
        List<ProductVM> res_to_send = new List<ProductVM>();



        if (res.Count > 0)
        {
            for (int i = 0; i < res.Count; i++)
            {
                Product product = res[i];

                var item = _mapper.Map<Product, ProductVM>(product);
                //var comments = await _commentService.GetCommentsByProductIdAsync(product.Id);
                //item.Comments = comments;


                ////var mainImage = await _productImageService.GetMainImageByIdAsync(item.Id);
                ////if (mainImage != null)
                ////    item.Image = _productImageService.GetBase64ByName(mainImage.Name,Qualities.QualitiesSelector.LOW);

                res_to_send.Add(item);
            }

            return new ServiceResponse
            {
                Message = "Отримано товари по користувачу",
                IsSuccess = true,
                Payload = res_to_send
            };
        }

        return new ServiceResponse()
        {
            Message = "Ви ще не додали товари",
            IsSuccess = false,
        };
    }
}