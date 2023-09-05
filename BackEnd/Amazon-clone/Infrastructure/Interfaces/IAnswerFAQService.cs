using DAL.Entities;
using Infrastructure.Models;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IAnswerFAQService
    {
        public Task<ServiceResponse> GetAllAnswerFAQAsync();
        public Task<ServiceResponse> GetAnswerFAQByFAQIdAsync(int id);
        public Task<ServiceResponse> AddAnswerFAQAsync(AnswerFAQDTO model);
        public Task DeleteAnswerFAQByIdAsync(int id);
    }
}
