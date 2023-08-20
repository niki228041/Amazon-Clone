using DAL.Constants;
using DAL.Entities.DTO_s;
using Infrastructure.Enum_s;
using Infrastructure.Interfaces;
using Infrastructure.Models;
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

        public ProductsController(IProductService productService, IImageService imageService)
        {
            _productService = productService;
            _imageService = imageService;
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
            if (res.IsSuccess)
            {
                return Ok(res);
            }

            return BadRequest(res);
        }

        [HttpPost("GetProductByCategoryId")]
        public async Task<IActionResult> GetProductByCategoryIdAsync([FromBody] FindByIdVM Id)
        {
            var res = await _productService.GetProductByCategoryId(Id.Id);
            if (res.IsSuccess)
            {
                return Ok(res);
            }

            return BadRequest(res);
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
    }
}
