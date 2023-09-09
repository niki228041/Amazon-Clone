using AutoMapper;
using DAL.Constants;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Enum_s;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using Services;
using SixLabors.ImageSharp.Formats.Jpeg;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CategoryImageService : ICategoryImageService
    {
        private readonly ICategoryImageRepository _categoryImageRepository;
        private readonly IImageService _imageService;

        public CategoryImageService(ICategoryImageRepository categoryImageService, IImageService imageService)
        {
            _categoryImageRepository = categoryImageService;
            _imageService = imageService;
        }


        public async Task<string> CreateCategoryImageAsync(CategoryImage img)
        {
            try
            {
                await _categoryImageRepository.Create(img);

                return "created";
            }
            catch
            {
                return null;
            }
        }

        public string GetBase64ByName(string name,Qualities.QualitiesSelector quality)
        {
            try
            {
                var dir = Path.Combine(Directory.GetCurrentDirectory(), DirectoriesInProject.ProductImages, name + "_" + (int)quality + ".jpg");

                var bytesOfImage = File.ReadAllBytes(dir);

                var stringBytes = Convert.ToBase64String(bytesOfImage);

                //await _productImageService.Create(new ProductImage { });

                return  stringBytes;
            }
            catch
            {
                return null;
            }
        }


        public Task<ServiceResponse> GetCategoryImageAsync()
        {
            throw new NotImplementedException();
        }

        public Task DeleteImageByCategoryId(int id)
        {
            var toDelete = _categoryImageRepository.GetAll().Where(img => img.CategoryId == id).ToList();
            toDelete.ForEach(img => _categoryImageRepository.Delete(img.Id));
            
            return Task.CompletedTask;
        }
    }
}
