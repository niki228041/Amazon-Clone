using AutoMapper;
using DAL.FAQ;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class FAQService : IFAQService
    {
        private readonly IMapper _mapper;
        private readonly IFAQRepository _fAQRepository;

        public FAQService(IMapper mapper, IFAQRepository fAQRepository)
        {
            _mapper = mapper;
            _fAQRepository = fAQRepository;
        }

        public async Task<ServiceResponse> AddFAQAsync(FAQDTO model)
        {
            var faq = _mapper.Map<FAQDTO, FrequentlyAskedQuestion>(model);
            await _fAQRepository.Create(faq);

            var faqVm = _mapper.Map<FrequentlyAskedQuestion, FAQVM>(faq);

            return new ServiceResponse()
            {
                IsSuccess= true,
                Payload= faqVm
            };
        }

        public async Task DeleteFAQByIdAsync(int id)
        {
            var faq = await _fAQRepository.GetById(id);
            await _fAQRepository.Delete(faq);
        }

        public async Task<ServiceResponse> GetAllFAQAsync()
        {
            var faqs = _fAQRepository.GetAll().Include(faq=>faq.AnswerToFAQ).ToList();

            var faqsVm = _mapper.Map<List<FrequentlyAskedQuestion>, List<FAQVM>>(faqs);


            return new ServiceResponse()
            {
                IsSuccess = true,
                Payload = faqsVm
            };
        }
    }
}
