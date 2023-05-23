
using Infrastructure.Models.Caterories;
using Services;

namespace Infrastructure.Interfaces
{ 
    public interface ICategoryService
    {
        Task<int> Create(CategoryCreateVM model);
        Task<ServiceResponse> GetAllAsync();
    }
}