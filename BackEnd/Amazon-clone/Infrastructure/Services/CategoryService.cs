using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Models.Caterories;
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
            return new ServiceResponse()
            {
                IsSuccess = true,
                Payload = _mapper.Map<ICollection<CategoryEntity>, ICollection<CategoryVM>>(_categoryRepository.Categories.ToList())
            };
        }
    }
}