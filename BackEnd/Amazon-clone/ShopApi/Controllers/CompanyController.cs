using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet("GetAllCompanies")]
        public async Task<IActionResult> GetAllCompaniesAsync()
        {
            var result = await _companyService.GetAllCompaniesAsync();
            return Ok(result);
        }

        [HttpPost("AddCompany")]
        public async Task<IActionResult> AddCompanyAsync(CompanyDTO model)
        {
            var result = await _companyService.AddCompanyAsync(model);
            return Ok(result);
        }

        [HttpPost("GetCompanyByUserId")]
        public async Task<IActionResult> GetCompanyByUserIdAsync(FindByIdVM model)
        {
            var result = await _companyService.GetCompanyByUserIdAsync(model.Id);
            return Ok(result);
        }

        [HttpPost("AddUserToCompany")]
        public async Task<IActionResult> AddUserToCompanyAsync(AddUserToCompanyDTO model)
        {
            var result = await _companyService.AddUserToCompanyAsync(model);
            return Ok(result);
        }

    }
}
