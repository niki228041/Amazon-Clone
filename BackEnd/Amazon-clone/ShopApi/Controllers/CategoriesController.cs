using DAL.Entities;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Models.Caterories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet]
        [Route("GetMainCategories")]
        public async Task<IActionResult> GetMainCategoriesAsync()
        {
            return Ok(await _categoryService.GetMainCategoriesAsync());
        }

        [HttpPost]
        [Route("GetAllSubcategoriesByCategoryId")]
        public async Task<IActionResult> GetAllSubcategoriesByCategoryIdAsync([FromBody] FindByIdVM model)
        {
            return Ok(await _categoryService.GetAllSubcategoriesByCategoryId(model.Id));
        }

        [HttpPost("DeleteCategory")]
        public async Task<IActionResult> DeleteCategoryAsync([FromBody] FindByIdVM model)
        {
            await _categoryService.DeleteCategoryAsync(model.Id);
            return Ok(model);
        }

    }
}