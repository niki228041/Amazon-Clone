using DAL.Entities;
using DAL.Validation;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpGet("GetAllCards")]
        public async Task<IActionResult> GetAllCardsAsync()
        {
            var result = await _cardService.GetAllCardsAsync();
            return Ok(result);
        }

        [HttpPost("AddCard")]
        public async Task<IActionResult> AddCardAsync(CardDTO model)
        {
            var result = await _cardService.AddCardAsync(model);
            return Ok(result);
        }

        [HttpPost("SetDefaultCard")]
        public async Task<IActionResult> SetDefaultCardAsync(SetDefaultCardDTO model)
        {
            await _cardService.SetDefaultCardAsync(model.CardId,model.UserId);
            return Ok();
        }


        [HttpPost("GetCardByUserId")]
        public async Task<IActionResult> GetCardByUserIdAsync(FindByIdVM model)
        {
            var result = await _cardService.GetCardsByUserIdAsync(model.Id);
            return Ok(result);
        }

        [HttpPost("FindDefaultCardByUserId")]
        public async Task<IActionResult> FindDefaultCardByUserIdAsync(FindByIdVM model)
        {
            var result = await _cardService.FindDefaultCardAsync(model.Id);
            return Ok(result);
        }

    }
}
