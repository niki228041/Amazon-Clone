using AutoMapper;
using DAL.Entities;
using DAL.Interfaces;
using DAL.Repositories;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Models.Caterories;
using Microsoft.EntityFrameworkCore;
using Services;
using System.Text.Json.Serialization;
using System.Text.Json;
using DAL.Entities.FilterEntities;
using Microsoft.VisualBasic;
using DAL.Entities.Music;
using DAL.Constants;

namespace Infrastructure.Services
{
    public class TrackService : ITrackService
    {
        private readonly IMapper _mapper;
        private readonly ITrackRepository _trackRepository;
        private readonly IImageService _imageService;
        private readonly ILikedTracksService _likedTracksService;
        private readonly IUserRepository _userRepository;
        private readonly ITrackHistoryService _trackHistoryService;

        public TrackService(IMapper mapper, ITrackRepository trackRepository, IImageService imageService, ILikedTracksService likedTracksService, IUserRepository userRepository, ITrackHistoryService trackHistoryService)
        {
            _mapper = mapper;
            _trackRepository = trackRepository;
            _imageService = imageService;
            _likedTracksService = likedTracksService;
            _userRepository = userRepository;
            _trackHistoryService = trackHistoryService;
        }

        public async Task<Track> CreateTrackAsync(TrackDTO model)
        {
            var track = _mapper.Map<TrackDTO, Track>(model);
            var mainImage = await _imageService.SaveImageAsync(model.Image,DirectoriesInProject.MusicImages);
            var backgroundImage = await _imageService.SaveImageAsync(model.Background,DirectoriesInProject.MusicImages);

            track.Background = backgroundImage;
            track.Image = mainImage;

            track.Song = SaveSong(model.Song);

            await _trackRepository.Create(track);
            return track;
        }

        public string SaveSong(string base64)
        {
            var file_id = Guid.NewGuid().ToString();
            var filename = string.Format(@"{0}", file_id + ".mp3");

            var dir = Path.Combine(Directory.GetCurrentDirectory(), DirectoriesInProject.MusicFiles);
            var path = Path.Combine(dir, filename);

            byte[] binaryData = Convert.FromBase64String(base64);
            File.WriteAllBytes(path, binaryData);
            return filename;
        }

        public string GetSong(string name)
        {
            //var filename = string.Format(@"{0}", name + ".mp3");

            var dir = Path.Combine(Directory.GetCurrentDirectory(), DirectoriesInProject.MusicFiles);
            var path = Path.Combine(dir, name);

            if (File.Exists(path))
            {
                var song = File.ReadAllBytes(path);
                var base64song = Convert.ToBase64String(song);
                return base64song;
            }
            return "";
        }

        public async Task<string> GetMainImageByIdAsync(int id)
        {
            var track = await _trackRepository.GetById(id);
            return track.Image;
        }

        public async Task<string> GetBackgroundImageByIdAsync(int id)
        {
            var track = await _trackRepository.GetById(id);
            return track.Background;
        }

        public async Task<List<TrackVM>> GetAllAsync()
        {
            var tracks = _trackRepository.GetAll().ToList();
            var tracksVMs = _mapper.Map<List<Track>, List<TrackVM>>(tracks);
            var likedTracks = await _likedTracksService.GetLikedTracks();

            foreach (var track in tracksVMs)
            {
                foreach (var likedTrack in likedTracks)
                {
                    if (likedTrack.Track.Id == track.Id)
                        track.WasLikedByUsers.Add((int)likedTrack.UserId);
                }
            }

            return tracksVMs;
        }

        public async Task<List<TrackVM>> GetTracksByUserIdCreatedByUserAsync(int id)
        {
            var tracks = _trackRepository.GetAll().Where(track=>track.UserId == id).ToList();
            var tracksVM = _mapper.Map<List<Track>, List<TrackVM>>(tracks);
            var likedTracks = await _likedTracksService.GetLikedTracks();
            var allHistory = await _trackHistoryService.GetAllTrackHistoryAsync();

            tracksVM.ForEach(track => track.Views = allHistory.FindAll(his => his.TrackId == track.Id).Count);

            foreach (var track in tracksVM)
            {
                foreach(var likedTrack in likedTracks)
                {
                    if(likedTrack.Track.Id == track.Id)
                        track.WasLikedByUsers.Add((int)likedTrack.UserId);
                }
            }

            return tracksVM;
        }

        public async Task<List<TrackVM>> GetLikedTracksByUserIdAsync(int id)
        {
            var tracks = _trackRepository.GetAll().Where(track => track.UserId == id).ToList();
            var tracksVM = _mapper.Map<List<Track>, List<TrackVM>>(tracks);
            var likedTracks = await _likedTracksService.GetLikedTracksByUserId(id);
            var list = new List<TrackVM>();
            likedTracks.ForEach(lt=>list.Add(lt.Track));

            return list;
        }

        public async Task<TrackVM> SetLikedTrackAsync(SetLikedTrackDTO model)
        {
            var track = await _trackRepository.GetById(model.TrackId);
            var user = await _userRepository.GetUserByIdAsync(model.UserId.ToString());
            var trackVm = _mapper.Map<Track, TrackVM> (track);

            if (track != null && user != null)
            {
                if (model.isLiked)
                {
                    await _likedTracksService.AddLikedTrack(model);
                    return trackVm;
                }
                else
                {
                    await _likedTracksService.DeleteLikedTrack(model);
                    return trackVm;
                }
            }

            return null;
        }

        public async Task<List<TrackHistory>> GetAllTrackHistoryAsync()
        {
            return await _trackHistoryService.GetAllTrackHistoryAsync();
        }

        public async Task<TrackHistory> AddTrackHistoryAsync(AddTrackHistoryDTO model)
        {
            return await _trackHistoryService.AddTrackHistoryAsync(model);
        }

        public async Task<List<TrackVM>> GetTrackHistoryByUserIdAsync(FindByIdVM model)
        {
            var historyList = await _trackHistoryService.GetTrackHistoryByUserIdAsync(model.Id);
            var trackVms = new List<TrackVM>();
            var likedTracks = await _likedTracksService.GetLikedTracks();

            foreach (var historyItem in historyList)
            {
                var trackVm = _mapper.Map<Track, TrackVM>(historyItem.Track);
                trackVm.TrackHistoryDateCreated = historyItem.DateCreated;
                trackVms.Add(trackVm);
            }

            foreach (var track in trackVms)
            {
                foreach (var likedTrack in likedTracks)
                {
                    if (likedTrack.Track.Id == track.Id)
                    {
                        track.WasLikedByUsers.Add((int)likedTrack.UserId);
                    }
                }
            }

            return trackVms;
        }

        public async Task DeleteTrackAsync(int id)
        {
            await _trackRepository.Delete(id);
        }

        public async Task<TrackVM> GetTrackByIdAsync(int id)
        {
            var track = _trackRepository.GetAll().Where(track => track.Id == id).FirstOrDefault();
            var trackVM = _mapper.Map<Track, TrackVM>(track);
            var likedTracks = await _likedTracksService.GetLikedTracks();
            var allHistory = await _trackHistoryService.GetAllTrackHistoryAsync();

            trackVM.Views = allHistory.FindAll(his => his.TrackId == track.Id).Count;

            foreach (var likedTrack in likedTracks)
            {
                if (likedTrack.Track.Id == track.Id)
                    trackVM.WasLikedByUsers.Add((int)likedTrack.UserId);
            }

            return trackVM;
        }
    }
}