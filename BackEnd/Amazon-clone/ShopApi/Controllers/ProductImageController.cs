using DAL.Constants;
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
    public class ProductImageController : ControllerBase
    {
        private readonly IProductImageService _productImageService;
        private readonly IProductService _productService;

        public ProductImageController(IProductImageService productImageService, IProductService productService)
        {
            _productImageService = productImageService;
            _productService = productService;
        }

        [HttpPost("GetImageById")]
        public async Task<IActionResult> GetImageByIdAsync(FindByIdVM model)
        {
            //[FromBody] GetProductsVM model
            var res = await _productImageService.GetMainImageByIdAsync(model.Id);
            var base64 = _productImageService.GetBase64ByName(res.Name, Qualities.QualitiesSelector.HIGH);
            if (base64 != null)
            {
                return Ok(base64);
            }

            return BadRequest();
        }

        [HttpPost("GetImageLinksByProductsIds")]
        public async Task<IActionResult> GetImageLinksByProductsIds(FindByIdVM[] model)
        {
            List<ProductImageLinkVM> images = new List<ProductImageLinkVM>();
            foreach (var byId in model)
            {
                var image = await _productImageService.GetMainImageByIdAsync(byId.Id);



                string port = string.Empty;
                if (Request.Host.Port != null)
                    port = ":" + Request.Host.Port.ToString();
                var url = $@"{Request.Scheme}://{Request.Host.Host}{port}/images/{image.Name + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
                images.Add(new ProductImageLinkVM { image= url ,productId=byId.Id});
            }
            return Ok(images);
        }

    }
}
