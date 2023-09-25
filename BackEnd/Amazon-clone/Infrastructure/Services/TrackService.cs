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
using DAL.Migrations;
using Infrastructure.Enum_s;

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
        private readonly ITrackCommentService _trackCommentService;
        private readonly ITrackGenreRepository _trackGenreRepository;
        private readonly IUserFollowerRepository _userFollowerRepository;
        private readonly IAlbumRepository _albumRepository;

        private readonly IGenreService _genreService;

        public TrackService(IMapper mapper, ITrackRepository trackRepository, IImageService imageService, ILikedTracksService likedTracksService, IUserRepository userRepository, ITrackHistoryService trackHistoryService, ITrackCommentService trackCommentService, ITrackGenreRepository trackGenreRepository, IGenreService genreService, IUserFollowerRepository userFollowerRepository,IAlbumRepository albumRepository)
        {
            _mapper = mapper;
            _trackRepository = trackRepository;
            _imageService = imageService;
            _likedTracksService = likedTracksService;
            _userRepository = userRepository;
            _trackHistoryService = trackHistoryService;
            _trackCommentService = trackCommentService;
            _trackGenreRepository = trackGenreRepository;
            _genreService = genreService;
            _userFollowerRepository = userFollowerRepository;
            _albumRepository = albumRepository;
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

            foreach (var genreId in model.GenresIds)
            {
                var trackGenre = new TrackGenre() { TrackId = track.Id, GenreId = genreId };
                await _trackGenreRepository.Create(trackGenre);
            }

            
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

            var allHistory = await _trackHistoryService.GetAllTrackHistoryAsync();

            

            foreach (var track in tracksVMs)
            {
                foreach (var likedTrack in likedTracks)
                {
                    if (likedTrack.Track.Id == track.Id)
                        track.WasLikedByUsers.Add((int)likedTrack.UserId);

                    track.Views = allHistory.FindAll(his => his.TrackId == track.Id).Count;
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
            var allHistory = await _trackHistoryService.GetAllTrackHistoryAsync();

            list.ForEach(track => track.Views = allHistory.FindAll(his => his.TrackId == track.Id).Count);

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
            var allHistory = await _trackHistoryService.GetAllTrackHistoryAsync();

            foreach (var historyItem in historyList)
            {
                var trackVm = _mapper.Map<Track, TrackVM>(historyItem.Track);
                trackVm.TrackHistoryDateCreated = historyItem.DateCreated;
                trackVms.Add(trackVm);
            }
            trackVms.ForEach(track => track.Views = allHistory.FindAll(his => his.TrackId == track.Id).Count);

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

            var user = await _userRepository.GetUserByIdAsync(track.UserId.ToString());

            var subscribers = await GetSubscribersByUserIdAsync((int)track.UserId);
            trackVM.Subscribers = (List<AllUsersVM>)subscribers.Payload;

            trackVM.Username = user.DisplayName;


            trackVM.Views = allHistory.FindAll(his => his.TrackId == track.Id).Count;

            foreach (var likedTrack in likedTracks)
            {
                if (likedTrack.Track.Id == track.Id)
                    trackVM.WasLikedByUsers.Add((int)likedTrack.UserId);
            }

            return trackVM;
        }

        public async Task<List<TrackVM>> GetTrackByIdsAsync(FindByIdVM[] model)
        {
            var trackIds = model.Select(m => m.Id).ToArray();

            var tracks = await _trackRepository.GetAll()
                .Where(track => trackIds.Contains(track.Id))
                .ToListAsync();

            var likedTracks = await _likedTracksService.GetLikedTracks();
            var allHistory = await _trackHistoryService.GetAllTrackHistoryAsync();

            var trackVMs = new List<TrackVM>();

            foreach (var track in tracks)
            {
                var trackVM = _mapper.Map<Track, TrackVM>(track);

                trackVM.Views = allHistory.Count(his => his.TrackId == track.Id);

                foreach (var likedTrack in likedTracks)
                {
                    if (likedTrack.Track.Id == track.Id)
                        trackVM.WasLikedByUsers.Add((int)likedTrack.UserId);
                }

                trackVMs.Add(trackVM);
            }

            return trackVMs;
        }

        

        public async Task<ServiceResponse> GetSearchTracksByNameAsync(string name) ////
        {
            var lowercaseName = string.IsNullOrEmpty(name) ? string.Empty : name.ToLower();

            // Log auditing information here if needed

            var tracks = _trackRepository.GetAll()
                .Where(prod => string.IsNullOrEmpty(lowercaseName) || prod.Title.ToLower().Contains(lowercaseName))
                .ToList();

            var users = await _userRepository.GetAllUsersAsync();

            var foundedUsers = users.FindAll(user => string.IsNullOrEmpty(lowercaseName) || user.DisplayName.ToLower().Contains(lowercaseName)).ToList();
            var foundedUsersVms = _mapper.Map<List<User>, List<AllUsersVM>>(foundedUsers);

            var foundedAlbums = _albumRepository.GetAll()
                .Where(album => string.IsNullOrEmpty(lowercaseName) || album.Title.ToLower().Contains(lowercaseName))
                .ToList();
            var foundedAlbumsVMs = _mapper.Map<List<Album>, List<AlbumVM>>(foundedAlbums);


            var tracksVM = _mapper.Map<List<Track>, List<TrackVM>>(tracks);
            var likedTracks = await _likedTracksService.GetLikedTracks();
            var allHistory = await _trackHistoryService.GetAllTrackHistoryAsync();

            tracksVM.ForEach(track => track.Views = allHistory.FindAll(his => his.TrackId == track.Id).Count);

            var list = new List<SearchPlayerItem>();

            foreach (var track in tracksVM)
            {
                var comments = await _trackCommentService.GetTrackCommentsByTrackIdAsync(track.Id);
                track.Genres = await _genreService.GetGenresByTrackIdAsync(track.Id);
                track.Comments = comments.Count;

                track.Song = $@"https://amazonclone.monster/api/{DirectoriesInProject.MusicFiles}/{track.Song}";
                track.Image = $@"https://amazonclone.monster/api/{DirectoriesInProject.MusicImages}/{track.Image + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";

                foreach (var likedTrack in likedTracks)
                {
                    if (likedTrack.Track.Id == track.Id)
                        track.WasLikedByUsers.Add((int)likedTrack.UserId);
                }

                list.Add(new SearchPlayerItem() { Type = "Track",Name=track.Title,Item=track});
            }

            foreach (var albumVM in foundedAlbumsVMs)
            {
                albumVM.Background = $@"https://amazonclone.monster/api/{DirectoriesInProject.MusicImages}/{albumVM.Background + "_" + (int)Qualities.QualitiesSelector.LOW + ".jpg"}";
                list.Add(new SearchPlayerItem() { Type = "Album", Name = albumVM.Title, Item = albumVM });
            }

            foreach (var usersVm in foundedUsersVms)
            {
                usersVm.AvatarImage = $@"https://amazonclone.monster/api/{DirectoriesInProject.ProductImages}/{usersVm.AvatarImage + "_" + (int)Qualities.QualitiesSelector.LOW + ".jpg"}";

                list.Add(new SearchPlayerItem() { Type = "User", Name = usersVm.DisplayName, Item = usersVm });
            }

            var sortedList = list.OrderBy(item => item.Name).ToList();

            return new ServiceResponse()
            {
                Payload = sortedList,
                IsSuccess = true,
                Message = "Результати Пошуку"
            };
        }

        public async Task<ServiceResponse> SubscribeAsync(SubscribeDTO model)
        {
            var user = await _userRepository.GetUserByIdAsync(model.UserId.ToString());
            var subscriber = await _userRepository.GetUserByIdAsync(model.SubscriberId.ToString());
            var userFollowers = _userFollowerRepository.GetAll();

            if (user == null)
            {
                return new ServiceResponse()
                {
                    Message = "Не знайденно такого користувача.",
                    IsSuccess= false
                };
            }

            if (subscriber == null)
            {
                return new ServiceResponse()
                {
                    Message = "Ви не зареэстровані.",
                    IsSuccess = false
                };
            }

            var canSubscribe = false;
            UserFollower follower = null;

            foreach (var foll in userFollowers)
            {
                if(foll.UserId == model.UserId && foll.FollowerId == model.SubscriberId)
                {
                    canSubscribe = true;
                    follower = foll;
                }
            }


            if (!canSubscribe)
            {
                await _userFollowerRepository.Create(new UserFollower() { UserId = user.Id, FollowerId = subscriber.Id });

                return new ServiceResponse()
                {
                    Message = "Ви підписалися.",
                    IsSuccess = false
                };
            }
            else
            {
                if(follower != null)
                {
                    await _userFollowerRepository.Delete(follower);

                    return new ServiceResponse()
                    {
                        Message = "Ви вже були підписані, тому відписалися.",
                        IsSuccess = false
                    };
                }
                else
                {
                    return new ServiceResponse()
                    {
                        Message = "Немаэ підписників.",
                        IsSuccess = false
                    };
                }
                

            }

        }

        public async Task<ServiceResponse> GetSubscribersByUserIdAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id.ToString());
            var userFollowers = _userFollowerRepository.GetAll();


            if (user == null)
            {
                return new ServiceResponse()
                {
                    Message = "Ви не зареэстровані.",
                    IsSuccess = false,
                };
            }

            var followers = new List<UserFollower>();

            foreach (var foll in userFollowers)
            {
                if (foll.UserId == id)
                {
                    followers.Add(foll);
                }
            }

            if (followers.Count >=0)
            {
                var subscribersVms = new List<AllUsersVM>();
                foreach (var foll in followers)
                {
                    var tmp = await _userRepository.GetUserByIdAsync(foll.FollowerId.ToString());
                    var userVm = _mapper.Map<User, AllUsersVM>(tmp);
                    userVm.Username = tmp.DisplayName;

                    subscribersVms.Add(userVm);
                }
                

                return new ServiceResponse()
                {
                    Message = "Список підписників.",
                    IsSuccess = true,
                    Payload = subscribersVms
                };
            }

            return new ServiceResponse()
            {
                Message = "Немаэ підписників.",
                IsSuccess = false,
            };

        }

        public async Task<ServiceResponse> GetMySubscribesByUserIdAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id.ToString());
            var userFollowers = _userFollowerRepository.GetAll();


            if (user == null)
            {
                return new ServiceResponse()
                {
                    Message = "Ви не зареэстровані.",
                    IsSuccess = false,
                };
            }

            var followers = new List<UserFollower>();

            foreach (var foll in userFollowers)
            {
                if (foll.FollowerId == id)
                {
                    followers.Add(foll);
                }
            }

            if (followers.Count >= 0)
            {
                var subscribers = new List<User>();
                foreach (var foll in followers)
                {
                    var tmp = await _userRepository.GetUserByIdAsync(foll.UserId.ToString());

                    subscribers.Add(tmp);
                }


                var subscribersVms = _mapper.Map<List<User>, List<AllUsersVM>>(subscribers);


                return new ServiceResponse()
                {
                    Message = "Список виконавців.",
                    IsSuccess = true,
                    Payload = subscribersVms
                };
            }

            return new ServiceResponse()
            {
                Message = "Немаэ виконавців.",
                IsSuccess = false,
            };

        }


    }
}