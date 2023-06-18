using DAL.Entities;
using DAL.Entities.DTO_s;
using Infrastructure.Models;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IProductImageService
    {
        Task<string> SaveImageAsync(string imgName);
        Task<string> CreateProductImageAsync(ProductImage imgName);
        Task<ServiceResponse> GetProductImageAsync();
        Task<ProductImage> GetMainImageByIdAsync(int id);
        Task DeleteAllImagesByProductId(int id);
        string GetBase64ByName(string name);
    }
}
