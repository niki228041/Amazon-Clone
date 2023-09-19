using DAL.Constants;
using DAL.Entities;
using DAL.Entities.DTO_s;
using Infrastructure.Enum_s;
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
        private readonly IImageService _imageService;

        public CategoriesController(ICategoryService categoryService, IImageService imageService)
        {
            _categoryService = categoryService;
            _imageService = imageService;
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
            return Ok(await _categoryService.GetNearSubcategoriesByCategoryId(model.Id));
        }

        [HttpPost]
        [Route("UploadImage")]
        public async Task<IActionResult> UploadImage([FromBody] UploadImagesDTO model)
        {
            List<string> images = new List<string>();
            foreach (var Image in model.images)
            {
                string fileName = await _imageService.SaveImageAsync(Image, DirectoriesInProject.CategoryImages);



                string port = string.Empty;
                if (Request.Host.Port != null)
                    port = ":" + Request.Host.Port.ToString();
                var url = $@"https://amazonclone.monster/api/images/{fileName + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
                images.Add(url);
            }
            return Ok(images);
        }

        [HttpPost("DeleteCategory")]
        public async Task<IActionResult> DeleteCategoryAsync([FromBody] FindByIdVM model)
        {
            await _categoryService.DeleteCategoryAsync(model.Id);
            return Ok(model);
        }

        [HttpPost("EditCategory")]
        public async Task<IActionResult> EditCategoryAsync([FromBody] EditCategoryDTO model)
        {
            await _categoryService.EditCategoryAsync(model);
            return Ok(model);
        }

    }
}