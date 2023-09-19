using AutoMapper;
using DAL.Constants;
using DAL.Entities;
using DAL.Entities.Music;
using DAL.Interfaces;
using Infrastructure.Enum_s;
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
    public class AlbumService : IAlbumService
    {
        private readonly IMapper _mapper;
        private readonly IAlbumRepository _albumRepository;
        private readonly ITrackRepository _trackRepository;
        private readonly IUserRepository _userRepository;
        private readonly IImageService _imageService;

        public AlbumService(IMapper mapper, IAlbumRepository albumRepository, IUserRepository userRepository, ITrackRepository trackRepository, IImageService imageService)
        {
            _mapper = mapper;
            _albumRepository = albumRepository;
            _userRepository = userRepository;
            _userRepository = userRepository;
            _trackRepository = trackRepository;
            _imageService = imageService;
        }

        public async Task<ServiceResponse> AddAlbumAsync(AlbumDTO model)
        {
            var album = _mapper.Map<AlbumDTO, Album>(model);
            var backgroundImage = await _imageService.SaveImageAsync(model.Background, DirectoriesInProject.MusicImages);
            album.Background = backgroundImage;

            await _albumRepository.Create(album);

            var trackAlbumsList = new List<TrackAlbum>();

            if (model.TracksIds.Count > 0)
            {
                model.TracksIds.ForEach(trackId =>
                {
                    var trackAlbum = new TrackAlbum() { AlbumId = album.Id, TrackId = trackId };
                    trackAlbumsList.Add(trackAlbum);
                }
                );
                album.TrackAlbums = trackAlbumsList;
                await _albumRepository.Update(album);
            }


            var albumVm = _mapper.Map<Album, AlbumVM>(album);
            var tracksList = new List<TrackVM>();

            foreach (var track in album.TrackAlbums)
            {
                var track_ =  await _trackRepository.GetById((int)track.TrackId);
                var trackVm = _mapper.Map<Track, TrackVM>(track_);
                tracksList.Add(trackVm);
            }
            albumVm.Tracks = tracksList;

            return new ServiceResponse()
            {
                Message = "Альбом було успішно створено",
                Payload = albumVm
            };
        }

        public async Task DeleteAlbumByIdAsync(int id)
        {
            await _albumRepository.Delete(id);
        }

        public async Task<ServiceResponse> GetAlbumByIdAsync(int id)
        {
            var album = await _albumRepository.GetAll()
                .Include(alb => alb.TrackAlbums)
                    .ThenInclude(trackAlbum => trackAlbum.Track)
                .Include(alb => alb.User)
                .FirstOrDefaultAsync(alb => alb.Id == id);

            
            var albumVm = _mapper.Map<Album, AlbumVM>(album);
            var tracksList = new List<TrackVM>();

            if (album != null)
            {
                foreach (var track in album.TrackAlbums)
                {
                    var trackVm = _mapper.Map<Track, TrackVM>(track.Track);
                    tracksList.Add(trackVm);
                }
                albumVm.Tracks = tracksList;
                if (album.User != null)
                    albumVm.Username = album.User.DisplayName;

                albumVm.Background = $@"https://amazonclone.monster/api/{DirectoriesInProject.MusicImages}/{albumVm.Background + "_" + (int)Qualities.QualitiesSelector.LOW + ".jpg"}";


                return new ServiceResponse()
                {
                    Message = "Альбом",
                    Payload = albumVm
                };
            }

            return new ServiceResponse()
            {
                Message = "Не правильна ід Альбома",
                Payload = albumVm
            };
        }

        public async Task<ServiceResponse> GetAlbumsByUserIdAsync(int userId)
        {
            var albums = _albumRepository.GetAll()
                .Include(alb => alb.TrackAlbums)
                    .ThenInclude(trackAlbum => trackAlbum.Track)
                .Include(alb => alb.User)
                .Where(alb => alb.UserId == userId);
            var albumsVms = new List<AlbumVM>();

            foreach (var album in albums)
            {
                var albumVm = _mapper.Map<Album, AlbumVM>(album);
                var tracksList = new List<TrackVM>();

                foreach (var track in album.TrackAlbums)
                {
                    var trackVm = _mapper.Map<Track, TrackVM>(track.Track);
                    tracksList.Add(trackVm);
                }
                albumVm.Tracks = tracksList;
                if(album.User != null)
                albumVm.Username = album.User.DisplayName;

                albumVm.Background = $@"https://amazonclone.monster/api/{DirectoriesInProject.MusicImages}/{albumVm.Background + "_" + (int)Qualities.QualitiesSelector.LOW + ".jpg"}";

                albumsVms.Add(albumVm);
            }


            return new ServiceResponse()
            {
                Message = "Альбоми за юзером",
                Payload = albumsVms
            };
        }


        public async Task<ServiceResponse> GetAllAlbumsAsync()
        {
            var albums = _albumRepository.GetAll()
                .Include(alb=>alb.TrackAlbums)
                .ThenInclude(trackAlbum => trackAlbum.Track)
                .Include(alb => alb.User);

            var albumsVms = new List<AlbumVM>();
            foreach(var album in albums)
            {
                var albumVm = _mapper.Map<Album, AlbumVM>(album);
                var tracksList = new List<TrackVM>();

                foreach (var track in album.TrackAlbums)
                {
                    var trackVm = _mapper.Map<Track, TrackVM>(track.Track);
                    tracksList.Add(trackVm);
                }
                albumVm.Tracks = tracksList;
                if (album.User != null)
                albumVm.Username = album.User.DisplayName;

                albumVm.Background = $@"https://amazonclone.monster/api/{DirectoriesInProject.MusicImages}/{albumVm.Background + "_" + (int)Qualities.QualitiesSelector.LOW + ".jpg"}";

                albumsVms.Add(albumVm);
            }

            

            return new ServiceResponse()
            {
                Message = "Альбоми",
                Payload = albumsVms
            };
        }
    }
}
