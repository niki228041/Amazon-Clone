using DAL.Entities;
using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface ICardService
    {
        public Task<List<CardVM>> GetAllCardsAsync();
        public Task<Card> AddCardAsync(CardDTO model);
        public Task<List<Card>> GetCardsByUserIdAsync(int userId);
        public Task SetDefaultCardAsync(int cardId, int userId);
        public Task<Card> FindDefaultCardAsync(int userId);
    }
}
