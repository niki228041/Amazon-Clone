using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class TrackHistoryService : ITrackHistoryService
    {
        private readonly ITrackHistoryRepository _trackHistoryRepository;
        private readonly IMapper _mapper;


        public TrackHistoryService(ITrackHistoryRepository trackHistoryRepository, IMapper mapper = null)
        {
            _trackHistoryRepository = trackHistoryRepository;
            _mapper = mapper;
        }

        public async Task<TrackHistory> AddTrackHistoryAsync(AddTrackHistoryDTO model)
        {
            var trackHistory = _mapper.Map<AddTrackHistoryDTO, TrackHistory>(model);
            var proof = _trackHistoryRepository.GetAll().FirstOrDefault(th => th.TrackId == model.TrackId && th.UserId == model.UserId);
            
            if (proof == null)
            {
                await _trackHistoryRepository.Create(trackHistory);
            }
            else
            {
                await _trackHistoryRepository.Delete(proof);
                await _trackHistoryRepository.Create(trackHistory);
            }
            return trackHistory;
        }

        public Task DeleteTrackHistoryByUserIdAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<TrackHistory>> GetAllTrackHistoryAsync()
        {
            return _trackHistoryRepository.GetAll().ToList();
        }

        public async Task<List<TrackHistory>> GetTrackHistoryByUserIdAsync(int userId)
        {
            return _trackHistoryRepository.GetAll().Where(th=>th.UserId==userId).Include(th=>th.Track).ToList();
        }
    }
}
