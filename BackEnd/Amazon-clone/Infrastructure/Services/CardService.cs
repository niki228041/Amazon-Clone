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
    public class CardService : ICardService
    {
        private readonly IMapper _mapper;
        private readonly ICardRepository _cardRepository;
        private readonly IUserRepository _userRepository;

        public CardService(IMapper mapper,ICardRepository cardRepository, IUserRepository userRepository)
        {
            _mapper = mapper;
            _cardRepository = cardRepository;
            _userRepository = userRepository;
        }

        public async Task<Card> AddCardAsync(CardDTO model)
        {
            var card = _mapper.Map<CardDTO, Card>(model);
            var otherCards = _cardRepository.GetAll().Where(card_ => card_.UserId == card.UserId).ToList();
            
            if(otherCards.Any() && card.IsDefault)
            foreach (var otherCard in otherCards)
            {
                otherCard.IsDefault = false;
                await _cardRepository.Update(otherCard);
            }

            await _cardRepository.Create(card);

            return card;
        }

        public async Task<List<CardVM>> GetAllCardsAsync()
        {
            var cards = _cardRepository.GetAll().ToList();
            return _mapper.Map<List<Card>,List<CardVM>>(cards) ;
        }

        public async Task<List<Card>> GetCardsByUserIdAsync(int userId)
        {
            try
            {
                var cards = _cardRepository.GetAll().Where(card => card.UserId == userId).ToList();
                return cards;
            }
            catch(Exception ex)
            {
                return null;
            }

        }

        public async Task SetDefaultCardAsync(int cardId, int userId)
        {
            // Update other cards to set IsDefault to false
            var otherCards = _cardRepository.GetAll().Where(card => card.UserId == userId).ToList();
            foreach (var otherCard in otherCards)
            {
                if(otherCard.Id == cardId)
                {
                    otherCard.IsDefault = true;
                }
                else
                {
                    otherCard.IsDefault = false;
                }
                await _cardRepository.Update(otherCard);
            }
        }

        public async Task<Card> FindDefaultCardAsync(int userId)
        {
            // Update other cards to set IsDefault to false
            var card = _cardRepository.GetAll().Where(card => card.UserId == userId && card.IsDefault).FirstOrDefault();
            //var cardVm = _mapper.Map<Card, CardVM>(card);

            return card;
        }
    }
}
