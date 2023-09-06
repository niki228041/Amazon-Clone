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
    public interface IFAQService
    {
        public Task<ServiceResponse> GetAllFAQAsync();
        public Task<ServiceResponse> AddFAQAsync(FAQDTO model);
        public Task DeleteFAQByIdAsync(int id);
    }
}
