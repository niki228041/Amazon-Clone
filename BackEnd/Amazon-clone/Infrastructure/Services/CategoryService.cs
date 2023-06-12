using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Models.Caterories;
using Microsoft.EntityFrameworkCore;
using Services;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace Infrastructure.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IProductRepository _productService;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper, IProductRepository productService)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _productService = productService;
        }

        public async Task<int> Create(CategoryCreateVM model)
        {
            var category_child = _mapper.Map<CategoryCreateVM, Category>(model);


            var category_parent = _categoryRepository.GetAll().FirstOrDefault(categ => categ.Id == model.CategoryId);

            


            if (category_parent!=null)
            {
                category_child.ParentId = category_parent.Id;
                await _categoryRepository.Create(category_child);

                category_parent.Subcategories.Add(category_child);
                await _categoryRepository.Update(category_parent);
            }
            else
            {
                await _categoryRepository.Create(category_child);
            }

            return 000;
        }

        public async Task<ServiceResponse> GetMainCategoriesAsync()
        {
            try
            {
                var categories = await _categoryRepository.Categories
                    .Where(c => c.ParentId == null)
                    .Include(c => c.Subcategories)
                    .ToListAsync();
                //var categoriesWithParents = _categoryRepository.Categories.Include(c => c.Parent).ToList();

                var categoryVMs = _mapper.Map<List<Category>, List<CategoryVM>>(categories);


                return new ServiceResponse
                {
                    IsSuccess = true,
                    Payload = categoryVMs
                };

            }
            catch (Exception ex)
            {

                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = ex.Message
                };
            }
        }

        public async Task DeleteCategoryAsync(int id)
        {
            var request = _productService.GetProductsAsync();
            var products = (List<Product>)request;
            
            foreach(var product in products)
            {
                _productService.Delete(product.Id);
            }

            await _categoryRepository.Delete(id);
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            try
            {


                var categories = await _categoryRepository.Categories
                    .Include(c => c.Parent)
                    .Include(c => c.Subcategories)
                    .ToListAsync();
                //var categoriesWithParents = _categoryRepository.Categories.Include(c => c.Parent).ToList();

                var categoryVMs = _mapper.Map<List<Category>, List<CategoryVM>>(categories);


                return new ServiceResponse
                {
                    IsSuccess = true,
                    Payload = categoryVMs
                };

            }
            catch (Exception ex)
            {

                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = ex.Message
                };
            }

        }

        public async Task<Category> GetByIdAsync(int id)
        {
            var category = _categoryRepository.Categories.Include(c => c.Subcategories).FirstOrDefault(categ=>categ.Id==id);


            if (category != null)
            {
                return category;
            }

            return null;
        }

        public async Task<ServiceResponse> GetAllSubcategoriesByCategoryId(int id)
        {
            try
            {
                var categories = await _categoryRepository.Categories.Include(c=>c.Subcategories).ToListAsync();
                var category = categories.Find(c=>c.Id == id);
                //var categoriesWithParents = _categoryRepository.Categories.Include(c => c.Parent).ToList();

                var categoryVM = _mapper.Map<Category, CategoryVM>(category);


                return new ServiceResponse
                {
                    IsSuccess = true,
                    Payload = categoryVM
                };

            }
            catch (Exception ex)
            {

                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = ex.Message
                };
            }
        }
    }
}