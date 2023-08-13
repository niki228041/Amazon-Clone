using DAL.Entities;
using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface ITrackCommentService
    {
        public Task<List<TrackCommentVM>> GetTrackCommentsAsync();
        public Task<TrackComment> AddTrackCommentAsync(TrackCommentDTO model);
        public Task<List<TrackCommentVM>> GetTrackCommentsByTrackIdAsync(int trackId);
        public Task DeleteTrackCommentByTrackIdAsync(int id);
        

    }
}
