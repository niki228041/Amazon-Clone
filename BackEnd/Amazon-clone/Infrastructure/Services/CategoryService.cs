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
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper, IProductRepository productService)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _productRepository = productService;
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
            var request = _productRepository.GetProductsAsync();
            var products = (List<Product>)request;
            
            foreach(var product in products)
            {
                _productRepository.Delete(product.Id);
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

        public async Task<ServiceResponse> GetNearSubcategoriesByCategoryId(int id)
        {
            try
            {
                var categories = await _categoryRepository.Categories.Include(c => c.Subcategories).ToListAsync();
                var category = categories.Find(c => c.Id == id);
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

        public async Task<List<CategoryVM>> GetAllSubcategoriesByCategoryId(int id)
        {
            var categories = await _categoryRepository.Categories.Include(c => c.Subcategories).ToListAsync();
            var category = categories.Find(c => c.Id == id);

            var categ_list = new List<Category>();

            if (category != null)
            {
                foreach (var categ_tmp in category.Subcategories)
                {
                    var sub_category = categories.Find(c => c.Id == categ_tmp.Id);
                    if (sub_category.Subcategories.Count != 0)
                    {
                        var allSubCategories = await getSubcategoriesFromCategory(sub_category.Subcategories);
                        categ_list.AddRange(allSubCategories);
                        categ_list = categ_list;
                    }
                    categ_list.Add(categ_tmp);
                }

                var final_list = _mapper.Map<List<Category>, List<CategoryVM>>(categ_list);

                return final_list;
            }
            return null;
        }

        public async Task<List<Category>> getSubcategoriesFromCategory(ICollection<Category> subcategories)
        {
            var categories = await _categoryRepository.Categories.Include(c => c.Subcategories).ToListAsync();

            var categ_list = new List<Category>();

            foreach (var categ_tmp in subcategories)
            {
                var sub_category = categories.Find(c => c.Id == categ_tmp.Id);
                if (sub_category.Subcategories != null)
                {
                    var allSubCategories = await getSubcategoriesFromCategory(sub_category.Subcategories);
                    categ_list.AddRange(allSubCategories);
                }
                categ_list.Add(categ_tmp);
            }

            return categ_list;
        }


    }
}