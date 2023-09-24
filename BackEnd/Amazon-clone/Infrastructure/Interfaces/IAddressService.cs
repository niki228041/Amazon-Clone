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
    public interface IAddressService
    {
        public Task<List<Address>> GetAllAddressesAsync();
        public Task<Address> AddAddressAsync(AddressDTO model);
        public Task<ServiceResponse> GetAddressByUserIdAsync(int userId);
        public Task DeleteAddressByUserIdAsync(int userId);
        public Task<List<Address>> GetAddressesByUserIdAsync(int userId);
        public Task<ServiceResponse> SetDefaultAddressByAddressIdAsync(int addressId);
    }
}
