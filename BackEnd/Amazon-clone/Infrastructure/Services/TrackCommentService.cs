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

namespace Infrastructure.Services
{
    public class TrackCommentService : ITrackCommentService
    {
        private readonly IMapper _mapper;
        private readonly ITrackCommentRepository _trackCommentRepository;
        private readonly IUserRepository _userRepository;

        public TrackCommentService(IMapper mapper, ITrackCommentRepository trackCommentRepository, IUserRepository userRepository)
        {
            _mapper = mapper;
            _trackCommentRepository = trackCommentRepository;
            _userRepository = userRepository;
        }

        public async Task<TrackComment> AddTrackCommentAsync(TrackCommentDTO model)
        {
            var trackComment = _mapper.Map<TrackCommentDTO,TrackComment>(model);
            await _trackCommentRepository.Create(trackComment);
            return trackComment;
        }

        public async Task DeleteTrackCommentByTrackIdAsync(int id)
        {
            var comment = await _trackCommentRepository.GetById(id);
            await _trackCommentRepository.Delete(comment);
        }

        public async Task<List<TrackCommentVM>> GetTrackCommentsAsync()
        {
            var trackComment = _trackCommentRepository.GetAll().Include(track => track.User).ToList();
            var trackCommentVms = _mapper.Map<List<TrackComment>, List<TrackCommentVM>>(trackComment);
            return trackCommentVms;
        }

        public async Task<List<TrackCommentVM>> GetTrackCommentsByTrackIdAsync(int trackId)
        {
            var trackComments = _trackCommentRepository.GetAll().Where(com => com.TrackId == trackId).Include(com=>com.User).ToList();
            var trackCommentVms = _mapper.Map<List<TrackComment>, List<TrackCommentVM>>(trackComments);
            return trackCommentVms;
        }

       
    }
}
