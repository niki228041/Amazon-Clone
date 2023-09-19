using DAL.Entities;
using Infrastructure.Models;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface ICompanyService
    {
        public Task<List<CompanyVM>> GetAllCompaniesAsync();
        public Task<CompanyVM> AddCompanyAsync(CompanyDTO model);
        public Task<ServiceResponse> AddUserToCompanyAsync(AddUserToCompanyDTO model);
        public Task<Company> GetCompanyByUserIdAsync(int userId);
        public Task<ServiceResponse> LeaveCompanyByUserIdAsync(int userId);
        public Task<CompanyVM> AddImageByCompanyIdAsync(ImageForCompanyDTO model);
    }
}
