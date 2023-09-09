using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FAQController : ControllerBase
    {
        private readonly IFAQService _faqService;

        public FAQController(IFAQService faqService)
        {
            _faqService = faqService;
        }

        [HttpGet("GetAllFAQ")]
        public async Task<IActionResult> GetAllFAQAsync()
        {
            var faqs = await _faqService.GetAllFAQAsync();

            return Ok(faqs);
        }

        [HttpPost("AddFAQ")]
        public async Task<IActionResult> AddFAQAsync(FAQDTO model)
        {
            var faq = await _faqService.AddFAQAsync(model);

            return Ok(faq);
        }

        [HttpPost("DeleteFAQById")]
        public async Task<IActionResult> DeleteFAQByIdAsync(FindByIdVM model)
        {
            await _faqService.DeleteFAQByIdAsync(model.Id);

            return Ok();
        }

    }
}
