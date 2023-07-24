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

        public TrackService(IMapper mapper, ITrackRepository trackRepository, IImageService imageService)
        {
            _mapper = mapper;
            _trackRepository = trackRepository;
            _imageService = imageService;
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

            return tracksVMs;
        }
    }
}