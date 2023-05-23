using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    { private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }
        [HttpPost("GetProducts")]
       
        public async Task<IActionResult> GetProductsAsync([FromBody] GetProductsVM model)
        {
            var res = await _productService.GetProductsAsync(model); 
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
        [Route("UploadImage")]
        public async Task<IActionResult> UploadImage([FromForm] ProductUploadImageViewModel model)
        {
            string fileName = string.Empty;
        
            if(model.Image!=null)
            {
                var fileExp = Path.GetExtension(model.Image.FileName);
                var dir = Path.Combine(Directory.GetCurrentDirectory(), "images");
                fileName = Path.GetRandomFileName() + fileExp;

                using (var stream = System.IO.File.Create(Path.Combine(dir, fileName)))
                {
                    await model.Image.CopyToAsync(stream);
                }
            }
            string port=string.Empty;
            if(Request.Host.Port!=null)
                port= ":"+Request.Host.Port.ToString();
            var url = $@"{Request.Scheme}://{Request.Host.Host}{port}/images/{fileName}";
            return Ok(url);
        }
    }
}
