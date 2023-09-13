using DAL.Constants;
using DAL.Entities.DTO_s;
using Infrastructure.Enum_s;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;
        private readonly IImageService _imageService;

        public CompanyController(ICompanyService companyService, IImageService imageService)
        {
            _companyService = companyService;
            _imageService = imageService;
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
            if (result != null)
            {
                var filename = await GetFullLinkByImageName(result.Image);
                result.Image = filename;
            }

            return Ok(result);
        }

        [HttpPost("AddAvatarToCompany")]
        public async Task<IActionResult> AddAvatarToCompanyAsync(ImageForCompanyDTO model)
        {
            var result = await _companyService.AddImageByCompanyIdAsync(model);
            return Ok(result);
        }

        

        [HttpPost("AddUserToCompany")]
        public async Task<IActionResult> AddUserToCompanyAsync(AddUserToCompanyDTO model)
        {
            var result = await _companyService.AddUserToCompanyAsync(model);
            return Ok(result);
        }

        [HttpPost("LeaveCompany")]
        public async Task<IActionResult> LeaveCompanyByUserIdAsync(FindByIdVM model)
        {
            var result = await _companyService.LeaveCompanyByUserIdAsync(model.Id);
            return Ok(result);
        }


        [HttpPost]
        [Route("UploadImage")]
        public async Task<IActionResult> UploadImage([FromBody] UploadImageDTO model)
        {
            string fileName = await _imageService.SaveImageAsync(model.Image, DirectoriesInProject.CompanyImages);

            string port = string.Empty;
            if (Request.Host.Port != null)
                port = ":" + Request.Host.Port.ToString();

            var url = $@"https://amazonclone.monster/api/{DirectoriesInProject.CompanyImages}/{fileName + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
            return Ok(new ImageLinkVM { Link = url, Id = 0 });
        }

        [HttpPost]
        [Route("GetLinkByImageName")]
        public async Task<string> GetFullLinkByImageName([FromBody] string image)
        {
            string port = string.Empty;
            if (Request.Host.Port != null)
                port = ":" + Request.Host.Port.ToString();

            var url = $@"https://amazonclone.monster/api/{DirectoriesInProject.CompanyImages}/{image + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
            return url;
        }

    }
}
