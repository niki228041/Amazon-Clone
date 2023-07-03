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
    public interface IUserService
    {
        public Task<ServiceResponse> LoginUserAsync(LoginViewModel model);
        public Task<ServiceResponse> GetAllUsersAsync();
        public Task<ServiceResponse> RegisterUserAsync(RegisterViewModel model);

    }
}
