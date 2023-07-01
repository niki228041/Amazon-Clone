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
    public class ProductImageService : IProductImageService
    {
        private readonly IProductImageRepository _productImageRepository;
        private readonly IImageService _imageService;

        public ProductImageService(IProductImageRepository productImageService,IImageService imageService)
        {
            _productImageRepository = productImageService;
            _imageService = imageService;
        }


        public async Task<string> CreateProductImageAsync(ProductImage img)
        {
            try
            {
                await _productImageRepository.Create(img);

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

        public async Task<ProductImage> GetMainImageByIdAsync(int id)
        {
            var img = _productImageRepository.GetAll().Where(img=>img.ProductId==id).FirstOrDefault(img=>img.IsMainImage==true);
            return img;
        }

        public async Task<List<ProductImage>> GetAllImageByProductIdAsync(int id)
        {
            var imgs = _productImageRepository.GetAll().Where(img => img.ProductId == id).ToList();
            return imgs;
        }

        public Task<ServiceResponse> GetProductImageAsync()
        {
            throw new NotImplementedException();
        }


        public async Task DeleteAllImagesByProductId(int id)
        {
            var toDelete = _productImageRepository.GetAll().Where(img => img.ProductId == id).ToList();
            toDelete.ForEach(img => _productImageRepository.Delete(img.Id));
        }

        
    }
}
