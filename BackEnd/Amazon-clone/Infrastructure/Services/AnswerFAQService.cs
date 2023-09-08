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
    public class AnswerFAQService:IAnswerFAQService
    {
        private readonly IMapper _mapper;
        private readonly IFAQRepository _fAQRepository;
        private readonly IAnswerFAQRepository _answerFAQRepository;

        public AnswerFAQService(IMapper mapper, IFAQRepository fAQRepository, IAnswerFAQRepository answerFAQRepository)
        {
            _mapper = mapper;
            _fAQRepository = fAQRepository;
            _answerFAQRepository = answerFAQRepository;
        }

        public async Task<ServiceResponse> AddAnswerFAQAsync(AnswerFAQDTO model)
        {
            var answerFaq = _mapper.Map<AnswerFAQDTO, AnswerToFAQ>(model);

            await _answerFAQRepository.Create(answerFaq);

            var answerFaqVm = _mapper.Map<AnswerToFAQ, AnswerFAQVM>(answerFaq);

            return new ServiceResponse()
            {
                IsSuccess = true,
                Payload = answerFaqVm
            };
        }

        public async Task DeleteAnswerFAQByIdAsync(int id)
        {
            var answerFaq = await _answerFAQRepository.GetById(id);
            await _answerFAQRepository.Delete(answerFaq);
        }

        public async Task<ServiceResponse> GetAllAnswerFAQAsync()
        {
            var answerFaqs = _answerFAQRepository.GetAll().ToList();

            var answerFaqsVm = _mapper.Map<List<AnswerToFAQ>, List<AnswerFAQVM>>(answerFaqs);


            return new ServiceResponse()
            {
                IsSuccess = true,
                Payload = answerFaqsVm
            };
        }

        public async Task<ServiceResponse> GetAnswerFAQByFAQIdAsync(int id)
        {
            var answerFaqs = _answerFAQRepository.GetAll().Where(ans=>ans.FrequentlyAskedQuestionId == id).ToList();

            var answerFaqsVm = _mapper.Map<List<AnswerToFAQ>, List<AnswerFAQVM>>(answerFaqs);


            return new ServiceResponse()
            {
                IsSuccess = true,
                Payload = answerFaqsVm
            };
        }
    }
}
