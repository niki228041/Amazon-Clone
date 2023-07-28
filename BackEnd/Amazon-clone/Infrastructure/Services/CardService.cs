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
    }
}
