using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerToFAQController : ControllerBase
    {
        private readonly IAnswerFAQService _answerFAQService;

        public AnswerToFAQController(IAnswerFAQService answerFAQService)
        {
            _answerFAQService = answerFAQService;
        }

        [HttpGet("GetAllAnswerFAQ")]
        public async Task<IActionResult> GetAllAnswerFAQAsync()
        {
            var faqs = await _answerFAQService.GetAllAnswerFAQAsync();

            return Ok(faqs);
        }

        [HttpPost("AddAnswerFAQ")]
        public async Task<IActionResult> AddAnswerFAQAsync(AnswerFAQDTO model)
        {
            var faq = await _answerFAQService.AddAnswerFAQAsync(model);

            return Ok(faq);
        }

        [HttpPost("DeleteAnswerFAQById")]
        public async Task<IActionResult> DeleteAnswerFAQByIdAsync(FindByIdVM model)
        {
            await _answerFAQService.DeleteAnswerFAQByIdAsync(model.Id);

            return Ok();
        }

        [HttpPost("GetAnswerFAQByFAQId")]
        public async Task<IActionResult> GetAnswerFAQByFAQIdAsync(FindByIdVM model)
        {
            var faqs = await _answerFAQService.GetAnswerFAQByFAQIdAsync(model.Id);

            return Ok(faqs);
        }

    }
}
