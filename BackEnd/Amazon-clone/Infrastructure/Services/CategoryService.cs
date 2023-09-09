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
using DAL.Entities.FilterEntities;
using Microsoft.VisualBasic;

namespace Infrastructure.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IProductRepository _productRepository;
        private readonly IOptionsRepository _optionsRepository;
        private readonly IOptionsCategoryRepository _optionsCategoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper, IProductRepository productService, IOptionsRepository optionsRepository, IOptionsCategoryRepository optionsCategoryRepository)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _productRepository = productService;
            _optionsRepository = optionsRepository;
            _optionsCategoryRepository = optionsCategoryRepository;
        }

        public async Task<ServiceResponse> Create(CategoryCreateVM model)
        {
            var category_child = _mapper.Map<CategoryCreateVM, Category>(model);


            var category_parent = _categoryRepository.GetAll().FirstOrDefault(categ => categ.Id == model.CategoryId);

            

            if (category_parent!=null)
            {
                category_child.ParentId = category_parent.Id;

                await _categoryRepository.Create(category_child);

                //adding options to category
                foreach (var options in model.OptionsIds)
                {
                    var real_option = await _optionsRepository.GetById(options);
                    if (real_option != null)
                    {
                        //category_child.Options.Add(real_option);
                        await _optionsCategoryRepository.Create(new OptionsCategory { CategoryId = category_child.Id, OptionsId = real_option.Id });
                    }
                }

                category_parent.Subcategories.Add(category_child);
                await _categoryRepository.Update(category_parent);
            }
            else
            {
                //category_child.Options = new List<Options>();
                await _categoryRepository.Create(category_child);
                //adding options to category
                foreach (var options in model.OptionsIds)
                {
                    var real_option = await _optionsRepository.GetById(options);
                    if (real_option != null)
                    {
                        //category_child.Options.Add(real_option);
                        await _optionsCategoryRepository.Create(new OptionsCategory
                        {
                            CategoryId = category_child.Id,
                            OptionsId = real_option.Id
                        });
                    }
                }
                await _categoryRepository.Update(category_child);

            }

            return new ServiceResponse
            {
                Message = "Category was created",
                IsSuccess = true,
            };
        }

        public async Task<ServiceResponse> GetMainCategoriesAsync()
        {
            try
            {
                var products = _productRepository.GetAll();
                var categories = await _categoryRepository.Categories
                    .Where(c => c.ParentId == null)
                    .Include(c => c.Subcategories)
                    .ToListAsync();

                foreach(var category in categories)
                {
                    var categoriesWithAllSubCategories = await GetAllSubcategoriesByCategoryId(category.Id);

                    var subcategoryIds = categoriesWithAllSubCategories.Select(cat => cat.Id).ToList();
                    subcategoryIds.Add(category.Id);

                    var productCount = products.Count(prod => subcategoryIds.Contains((int)prod.CategoryId));
                    category.CountOfProducts = productCount;
                }

                //var categoriesWithParents = _categoryRepository.Categories.Include(c => c.Parent).ToList();

                //categories.ForEach(cat => cat.CountOfProducts = products.Where(prod=>prod.CategoryId == cat.Id).Count());

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
            var category = _categoryRepository.Categories.Where(cat=>cat.Id==id).Include(cat=>cat.OptionsCategories).Include(cat=>cat.Products).Include(cat=>cat.Subcategories).FirstOrDefault();


             await _categoryRepository.Delete(category);
        }

        public async Task<ICollection<Options>> GetCategoryOptionsAsyncByCategoryId(int id)
        {
            //var category = _categoryRepository.Categories.Include(cat=>cat.OptionsCategories).FirstOrDefault(cat=>cat.Id==id);
            //var options = new List<Options>();
            //foreach (var opt_ in category.OptionsCategories)
            //{
            //    if(opt_.OptionsId != null)
            //    options.Add(await _optionsRepository.GetById((int)opt_.OptionsId));
            //}

            //return options;

            var options = await _categoryRepository.Categories
            .Where(cat => cat.Id == id)
            .SelectMany(cat => cat.OptionsCategories)
            .Where(oc => oc.OptionsId != null)
            .Select(oc => oc.Options)
            .ToListAsync();

            return options;
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            try
            {


                var categories = await _categoryRepository.Categories
                    .Include(c => c.Parent)
                    .Include(c => c.Subcategories)
                    .Include(c=>c.OptionsCategories)
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

        public async Task<ServiceResponse> EditCategoryAsync(EditCategoryDTO model)
        {
            var category = await _categoryRepository.Categories.FirstOrDefaultAsync(cat => cat.Id == model.CategoryId);

            if(category == null)
            {
                return new ServiceResponse()
                {
                    Message = "Завантажена категорія була некоректною,оновлення перервано",
                    IsSuccess = false,
                };
            }

            category.Name = model.Name;

            await _optionsRepository.RemoveOptionsForCategoryAsync(category.Id);
            await _optionsRepository.AddOptionsToCategoryAsync(category.Id,model.OptionsIds);
            await _optionsRepository.SaveChangesAsync();

            await _categoryRepository.Update(category);

            return new ServiceResponse()
            {
                Message = "Оновлення категорії пройшло успішно",
                IsSuccess = true,
            };

        }
    }
}