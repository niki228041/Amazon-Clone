using DAL.Entities;
using DAL.Entities.FilterEntities;
using Infrastructure.Models;
using Infrastructure.Models.Caterories;
using Services;

namespace Infrastructure.Interfaces
{ 
    public interface ICategoryService
    {
        Task<ServiceResponse> Create(CategoryCreateVM model);
        Task<ServiceResponse> GetAllAsync();
        Task<Category> GetByIdAsync(int id);
        Task DeleteCategoryAsync(int id);
        Task<ServiceResponse> GetMainCategoriesAsync();
        Task<ServiceResponse> GetNearSubcategoriesByCategoryId(int id);
        Task<List<CategoryVM>> GetAllSubcategoriesByCategoryId(int id);
        public Task<ICollection<Options>> GetCategoryOptionsAsyncByCategoryId(int id);

    }
}