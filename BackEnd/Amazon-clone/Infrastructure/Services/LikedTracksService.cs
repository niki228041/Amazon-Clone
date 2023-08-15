using AutoMapper;
using DAL.Entities;
using DAL.Entities.Music;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class LikedTracksService : ILikedTracksService
    {
        private readonly IMapper _mapper;
        private readonly ILikedTracksRepository _likedTracksRepository;
        private readonly IUserRepository _userRepository;

        public LikedTracksService(IMapper mapper, ILikedTracksRepository likedTracksRepository, IUserRepository userRepository)
        {
            _mapper = mapper;
            _likedTracksRepository = likedTracksRepository;
            _userRepository = userRepository;
        }

        public async Task<LikedTracks> AddLikedTrack(SetLikedTrackDTO model)
        {
            var likedTrack = _mapper.Map<SetLikedTrackDTO,LikedTracks>(model);
            var proof = _likedTracksRepository.GetAll().FirstOrDefault(likedTrack => likedTrack.TrackId == model.TrackId && likedTrack.UserId == model.UserId);
            if (proof == null)
            {
                await _likedTracksRepository.Create(likedTrack);
            }
            return likedTrack;
        }

        public async Task DeleteLikedTrack(SetLikedTrackDTO model)
        {
            var likedTrack = _likedTracksRepository.GetAll()
                .FirstOrDefault(likedTrack=>likedTrack.TrackId == model.TrackId && likedTrack.UserId == model.UserId);

            //if(likedTrack != null)
            await _likedTracksRepository.Delete(likedTrack);
        }

        public async Task<List<LikedTrackVM>> GetLikedTracks()
        {
            var allLikedTracks = _likedTracksRepository.GetAll().Include(alt=>alt.Track).ToList();
            return _mapper.Map<List<LikedTracks>,List<LikedTrackVM>>(allLikedTracks);
        }

        public async Task<List<LikedTrackVM>> GetLikedTracksByUserId(int userId)
        {
            var likedTracks = _likedTracksRepository.GetAll().Where(lt => lt.UserId == userId).Include(lt=>lt.Track).ToList();
            var likedTracksVm = _mapper.Map<List<LikedTracks>, List<LikedTrackVM>>(likedTracks);
            return likedTracksVm;
        }
    }
}
