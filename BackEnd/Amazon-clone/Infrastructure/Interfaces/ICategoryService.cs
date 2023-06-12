using DAL.Entities;
using Infrastructure.Models.Caterories;
using Services;

namespace Infrastructure.Interfaces
{ 
    public interface ICategoryService
    {
        Task<int> Create(CategoryCreateVM model);
        Task<ServiceResponse> GetAllAsync();
        Task<Category> GetByIdAsync(int id);
        Task DeleteCategoryAsync(int id);
        Task<ServiceResponse> GetMainCategoriesAsync();
        Task<ServiceResponse> GetAllSubcategoriesByCategoryId(int id);
    }
}