using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class AddressService : IAddressService
    {
        private readonly IMapper _mapper;
        private readonly IAddressRepository _addressRepository;
        private readonly IUserRepository _userRepository;

        public AddressService(IMapper mapper, IAddressRepository addressRepository, IUserRepository userRepository)
        {
            _mapper = mapper;
            _addressRepository = addressRepository;
            _userRepository = userRepository;
        }

        public async Task<Address> AddAddressAsync(AddressDTO model)
        {
            var address = _mapper.Map<AddressDTO, Address>(model);
            await _addressRepository.Create(address);
            return address;
        }

        public async Task<List<Address>> GetAllAddressesAsync()
        {
            var addresses = _addressRepository.GetAll().ToList();
            return addresses;
        }

        public async Task<Address> GetAddressByUserIdAsync(int userId)
        {
            var address = _addressRepository.GetAll().FirstOrDefault(address=>address.UserId==userId);
            return address;
        }

        public async Task DeleteAddressByUserIdAsync(int userId)
        {
            var address = _addressRepository.GetAll().FirstOrDefault(address => address.UserId == userId);
            
            if(address!=null) 
            await _addressRepository.Delete(address.Id);
        }
    }
}
