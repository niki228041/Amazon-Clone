using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Models.Caterories;
using Microsoft.EntityFrameworkCore;
using Services;

namespace Infrastructure.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<int> Create(CategoryCreateVM model)
        {
            return 0;
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            try
            {
                var categories = await _categoryRepository.Categories.Include(c => c.Subcategories).ToListAsync();
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
    }
}