using DAL.Constants;
using DAL.Entities.DTO_s;
using Infrastructure.Enum_s;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    { 
        private readonly IProductService _productService;
        private readonly IImageService _imageService;
        private readonly IProductImageService _productImageService;

        public ProductsController(IProductService productService, IImageService imageService,IProductImageService productImageService)
        {
            _productService = productService;
            _imageService = imageService;
            _productImageService = productImageService;
        }


        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProductsAsync()
        {
            //[FromBody] GetProductsVM model
            var res = await _productService.GetProductsAsync(); 
            if (res.IsSuccess)
            {
                return Ok(res);
            }

            return BadRequest();
        }

        [HttpGet("GetProduct")]
        public async Task<IActionResult> GetProductAsync(string title)
        {
            string p = string.Join(" ", title.Split('_'));
            var res = await _productService.GetProductAsync(p);
            if (res.IsSuccess)
            {
                return Ok(res);
            }

            return BadRequest(res);
        }

        [HttpPost]
        [Route("CreateProduct")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> CreateProductAsync(CreateProductDTO model) 
        {
            var res = await _productService.CreateProductAsync(model);
            if (res.IsSuccess)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpPost("DeleteProduct")]
        public async Task<IActionResult> DeleteProductAsync([FromBody] FindByIdVM model)
        {
            await _productService.DeleteProductAsync(model.Id);
            return Ok(model);
        }

        [HttpPost("GetProductById")]
        public async Task<IActionResult> GetProductByIdAsync([FromBody]FindByIdVM Id)
        {
            var res = await _productService.GetProductByIdAsync(Id.Id);
            var product = ((ProductOneVM)res.Payload);

            var images = await GetImageLinksByProductsIds(
            new FindByIdVM() {
                Id= product.Id
            });

            product.Images = images;

            if (product.CompanyVM != null)
            {
                var link = await GetFullLinkByImageName(product.CompanyVM.Image, DirectoriesInProject.CompanyImages);
                product.CompanyVM.Image = link;
            }

            res.Payload = product;

            if (res.IsSuccess)
            {
                return Ok(res);
            }

            return BadRequest(res);
        }

        [HttpPost]
        [Route("GetLinkByImageName")]
        public async Task<string> GetFullLinkByImageName([FromBody] string image,string dir)
        {
            string port = string.Empty;
            if (Request.Host.Port != null)
                port = ":" + Request.Host.Port.ToString();

            var url = $@"{Request.Scheme}://{Request.Host.Host}{port}/{dir}/{image + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
            return url;
        }

        [HttpPost("GetProductByCategoryId")]
        public async Task<IActionResult> GetProductByCategoryIdAsync([FromBody] GetProductsWithPaginationAndByCategoryIdDTO model)
        {
            var productsBoxing = await _productService.GetProductByCategoryIdWithPagination(model);
            var products = (List<ProductVM>)productsBoxing.Payload;
            var ids = new List<FindByIdVM>();
            products.ForEach(prod=> ids.Add(new FindByIdVM() { Id=prod.Id}));

            var images = await GetImageLinksByProductsIds(ids);


            foreach (var product in products)
            {
                foreach (var image in images)
                {
                    if(image.productId == product.Id)
                    {
                        product.Image = image.image; break;
                    }
                }
            }

            productsBoxing.Payload = products;


            return Ok(productsBoxing);
        }

        [HttpPost("GetProductWithFilters")]
        public async Task<IActionResult> GetProductWithFiltersAsync([FromBody] FilterVM model)
        {
            var res = await _productService.GetProductByFiltersAsync(model);
            if (res.IsSuccess)
            {
                return Ok(res);
            }

            return BadRequest(res);
        }

        [HttpPost]
        [Route("UploadImage")]
        public async Task<IActionResult> UploadImage([FromBody] UploadImagesDTO model)
        {
            List<string> images = new List<string>();
            foreach (var Image in model.images)
            {
                string fileName = await _imageService.SaveImageAsync(Image,DirectoriesInProject.ProductImages);



                string port = string.Empty;
                if (Request.Host.Port != null)
                    port = ":" + Request.Host.Port.ToString();
                var url = $@"{Request.Scheme}://{Request.Host.Host}{port}/images/{fileName + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
                images.Add(url);
            }
            return Ok(images);
        }


        [HttpPost("GetImageLinksByProductsIds")]
        public async Task<List<ProductImageLinkVM>> GetImageLinksByProductsIds(List<FindByIdVM> model)
        {
            List<ProductImageLinkVM> images = new List<ProductImageLinkVM>();
            foreach (var byId in model)
            {
                var image = await _productImageService.GetMainImageByIdAsync(byId.Id);


                if (image != null)
                {
                    string port = string.Empty;
                    if (Request.Host.Port != null)
                        port = ":" + Request.Host.Port.ToString();
                    var url = $@"{Request.Scheme}://{Request.Host.Host}{port}/images/{image.Name + "_" + (int)Qualities.QualitiesSelector.LOW + ".jpg"}";
                    images.Add(new ProductImageLinkVM { image = url, productId = byId.Id });
                }
            }
            return images;
        }

        [HttpPost("GetAllImagesLinksByProductId")]
        public async Task<List<string>> GetImageLinksByProductsIds(FindByIdVM model)
        {
            var images = await _productImageService.GetAllImageByProductIdAsync(model.Id);

            var imagesLinks = new List<string>();

            string port = string.Empty;
            foreach (var image in images)
            {
                if (Request.Host.Port != null)
                    port = ":" + Request.Host.Port.ToString();
                var url = $@"{Request.Scheme}://{Request.Host.Host}{port}/images/{image.Name + "_" + (int)Qualities.QualitiesSelector.LOW + ".jpg"}";
                imagesLinks.Add(url);
            }

           
            return imagesLinks;
        }
    }
}
