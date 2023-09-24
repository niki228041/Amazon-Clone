using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [HttpGet("GetAllAddresses")]
        public async Task<IActionResult> GetAllAddressesAsync()
        {
            var result = await _addressService.GetAllAddressesAsync();
            return Ok(result);
        }

        [HttpPost("AddAddress")]
        public async Task<IActionResult> AddAddressAsync(AddressDTO model)
        {
            var result = await _addressService.AddAddressAsync(model);
            return Ok(result);
        }

        [HttpPost("GetAddressByUserId")]
        public async Task<IActionResult> GetAddressByUserIdAsync(FindByIdVM model)
        {
            var result = await _addressService.GetAddressByUserIdAsync(model.Id);
            return Ok(result);
        }

        [HttpPost("GetAddressesByUserId")]
        public async Task<IActionResult> GetAddressesByUserId(FindByIdVM model)
        {
            var result = await _addressService.GetAddressesByUserIdAsync(model.Id);
            return Ok(result);
        }

        [HttpPost("DeleteAddressByUserId")]
        public async Task<IActionResult> DeleteAddressByUserIdAsync(FindByIdVM model)
        {
            await _addressService.DeleteAddressByUserIdAsync(model.Id);
            return Ok("ok");
        }

        [HttpPost("SetDefaultAddressByAddressId")]
        public async Task<IActionResult> SetDefaultAddressByAddressIdAsync(FindByIdVM model)
        {
            var result = await _addressService.SetDefaultAddressByAddressIdAsync(model.Id);
            return Ok(result);
        }

    }
}
