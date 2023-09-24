using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using Services;
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

            var otherAddresses = _addressRepository.GetAll().Where(card_ => card_.UserId == model.UserId).ToList();

            if (otherAddresses.Any() && address.IsDefault)
                foreach (var otherAddress in otherAddresses)
                {
                    otherAddress.IsDefault = false;
                    await _addressRepository.Update(otherAddress);
                }

            await _addressRepository.Create(address);
            return address;
        }

        public async Task<List<Address>> GetAllAddressesAsync()
        {
            var addresses = _addressRepository.GetAll().ToList();
            return addresses;
        }

        public async Task<ServiceResponse> GetAddressByUserIdAsync(int userId)
        {
            var address = _addressRepository.GetAll().FirstOrDefault(address=>address.UserId==userId && address.IsDefault == true);

            if(address == null)
            {
                return new ServiceResponse()
                {
                    Message = "Виберіть основний адресс в профілі",
                    IsSuccess = false,
                };
            }

            return new ServiceResponse()
            {
                Message = "Ваш адресс",
                IsSuccess = true,
                Payload = address,
            };
        }

        public async Task<ServiceResponse> SetDefaultAddressByAddressIdAsync(int addressId)
        {
            var addresses = await _addressRepository.GetAll().ToListAsync();


            if (addresses == null)
            {
                return new ServiceResponse()
                {
                    Message = "Такого адрессу не існує",
                    IsSuccess = false,
                };
            }

            foreach (var otherAddress in addresses)
            {
                if(otherAddress.Id == addressId)
                {
                    otherAddress.IsDefault= true;
                }
                else
                {
                    otherAddress.IsDefault= false;
                }

                await _addressRepository.Update(otherAddress);
            }

            return new ServiceResponse()
            {
                Message = "Ваш адресс був зміннений на основний",
                IsSuccess = true,
                Payload = addresses,
            };
        }

        public async Task<List<Address>> GetAddressesByUserIdAsync(int userId)
        {
            var addresses = _addressRepository.GetAll().Where(address => address.UserId == userId).ToList();
            return addresses;
        }

        public async Task DeleteAddressByUserIdAsync(int userId)
        {
            var address = _addressRepository.GetAll().FirstOrDefault(address => address.UserId == userId);
            
            if(address!=null) 
            await _addressRepository.Delete(address.Id);
        }
    }
}
