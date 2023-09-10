using DAL.Entities;
using DAL.Entities.DTO_s;
using Infrastructure.Enum_s;
using Infrastructure.Models;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface ICategoryImageService
    {
        Task<string> CreateCategoryImageAsync(CategoryImage imgName);
        Task<ServiceResponse> GetCategoryImageAsync();
        Task DeleteImageByCategoryId(int id);
        string GetBase64ByName(string name,Qualities.QualitiesSelector quality);
    }
}
