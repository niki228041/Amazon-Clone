using DAL.Entities;
using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface ITrackHistoryService
    {
        public Task<List<TrackHistory>> GetAllTrackHistoryAsync();
        public Task<TrackHistory> AddTrackHistoryAsync(AddTrackHistoryDTO model);
        public Task<List<TrackHistory>> GetTrackHistoryByUserIdAsync(int userId);
        public Task DeleteTrackHistoryByUserIdAsync(int userId);
    }
}
