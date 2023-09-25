using AutoMapper;
using DAL.Entities;
using DAL.Entities.FilterEntities;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OptionsController : ControllerBase
    {
        private readonly IVariantRepository _variantRepository;
        private readonly IOptionsRepository _optionsRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public OptionsController(IVariantRepository variantRepository, IOptionsRepository optionsRepository, IMapper mapper, ICategoryRepository categoryRepository,IProductRepository productRepository)
        {
            _optionsRepository = optionsRepository;
            _variantRepository = variantRepository;
            _mapper = mapper;
            _categoryRepository = categoryRepository;
            _productRepository = productRepository;
        }


        [HttpGet]
        [Route("GetAllOptions")]
        public async Task<IActionResult> GetAllAsync()
        {
            var res = _optionsRepository.GetAll().Include(c => c.Variants).Where(opt => !opt.isBaseOptions).ToList();
            var optionsVms = _mapper.Map<List<Options>,List<OptionsVM>>(res);

            return Ok(optionsVms);
        }

        [HttpGet]
        [Route("GetAllBaseOptionsAsync")]
        public async Task<IActionResult> GetAllBaseOptionsAsync()
        {
            var res = _optionsRepository.GetAll().Include(c => c.Variants).Where(opt=>opt.isBaseOptions).ToList();
            var optionsVms = _mapper.Map<List<Options>, List<OptionsVM>>(res);

            foreach (var opt in optionsVms)
            {
                opt.Variants.ForEach(var_ => 
                    var_.CountOfProducts = _productRepository.Products.Where(prod => prod.VariantProducts.FirstOrDefault(varik=>varik.VariantId== var_.Id) != null).Count()
                );
            }

            return Ok(optionsVms);
        }

        [HttpPost]
        [Route("GetOptionsByCategoryId")]
        public async Task<IActionResult> GetOptionsByCategoryIdAsync(FindByIdVM model)
        {
            var categories = _categoryRepository.Categories.Include(category => category.OptionsCategories).FirstOrDefault(category=>category.Id == model.Id);
            var optionsList = new List<Options>();

            if(categories != null)
            {
                foreach(var opt in categories.OptionsCategories)
                {
                    var res = _optionsRepository.GetAll().Include(op=>op.Variants).FirstOrDefault(op=>op.Id==opt.OptionsId);
                    optionsList.Add(res);
                }
            }

            var optionsVms = _mapper.Map<List<Options>, List<OptionsVM>>(optionsList);

            return Ok(optionsVms);
        }


        [HttpPost]
        [Route("CreateOptions")]
        public async Task<IActionResult> CreateOptionsAsync(CreateOptionsVM model)
        {
            var newOptions = new Options { Title = model.Title };
            await _optionsRepository.Create(newOptions);

            foreach (var variant in model.Variants)
            {
                await _variantRepository.Create(new Variant { Title = variant.Title, OptionsId = newOptions.Id});
            }
            
            return Ok("OK");
        }

        [HttpPost]
        [Route("DeleteOption")]
        public async Task<IActionResult> DeleteOptionAsync(FindByIdVM model)
        {
            await _optionsRepository.Delete(model.Id);

            return Ok("OK");
        }

    }
}
