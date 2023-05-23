using Infrastructure.Interfaces;
using Infrastructure.Models.Caterories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(CategoryCreateVM model)
        {
            var id =  await _categoryService.Create(model);
            return Ok(id);
        }
        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAllAsync()
        {
            return Ok(await _categoryService.GetAllAsync());
        }
    }
}