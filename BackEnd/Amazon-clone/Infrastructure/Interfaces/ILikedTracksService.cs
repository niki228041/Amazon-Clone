using DAL.Entities;
using DAL.Entities.Music;
using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface ILikedTracksService
    {
        public Task<LikedTracks> AddLikedTrack(SetLikedTrackDTO model);
        public Task DeleteLikedTrack(SetLikedTrackDTO model);
        public Task<List<LikedTrackVM>> GetLikedTracksByUserId(int userId);
        public Task<List<LikedTrackVM>> GetLikedTracks();
    }
}
