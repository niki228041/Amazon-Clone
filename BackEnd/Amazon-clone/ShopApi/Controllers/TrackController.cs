using AutoMapper;
using DAL.Constants;
using DAL.Entities;
using DAL.Entities.DTO_s;
using DAL.Entities.Music;
using DAL.Interfaces;
using Infrastructure.Enum_s;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;
using System.Diagnostics;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackController : ControllerBase
    {
        private readonly ITrackService _trackService;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;
        private readonly ITrackCommentService _trackCommentService;
        private readonly IWebHostEnvironment _env;
        private readonly bool _isProduction;

        public TrackController(IMapper mapper, ITrackService trackService, IImageService imageService,ITrackCommentService trackCommentService, IWebHostEnvironment env)
        {
            _env = env;
            _isProduction = _env.IsProduction();
            _trackCommentService = trackCommentService;
            _mapper = mapper;
            _trackService = trackService;
            _imageService = imageService;
        }


        [RequestSizeLimit(100_000_000)]
        [HttpPost]
        [Route("CreateTrack")]
        public async Task<IActionResult> CreateTrackAsync(TrackDTO model)
        {
            var track = await _trackService.CreateTrackAsync(model);
            return Ok(track);
        }

        [HttpGet]
        [Route("GetAllTracks")]
        public async Task<IActionResult> GetAllTracksAsync()
        {
            var tracks = await _trackService.GetAllAsync();

            foreach(var track in tracks)
            {
                track.Image = await GetFullLinkByImageName(track.Image);
                track.Background = await GetFullLinkByImageName(track.Background);
                track.Song = await GetFullLinkBySongName(track.Song);
            }

            return Ok(tracks);
        }

        [HttpPost]
        [Route("GetTracksByUserId")]
        public async Task<IActionResult> GetTracksByUserIdAsync(FindByIdVM model)
        {
            var tracks = await _trackService.GetTracksByUserIdCreatedByUserAsync(model.Id);

            foreach (var track in tracks)
            {
                track.Image = await GetFullLinkByImageName(track.Image);
                track.Background = await GetFullLinkByImageName(track.Background);
                track.Song = await GetFullLinkBySongName(track.Song);
            }

            return Ok(tracks);
        }

        [HttpPost]
        [Route("GetTrackById")]
        public async Task<IActionResult> GetTrackByIdAsync(FindByIdVM model)
        {
            var track = await _trackService.GetTrackByIdAsync(model.Id);

            track.Image = await GetFullLinkByImageName(track.Image);
            track.Background = await GetFullLinkByImageName(track.Background);
            track.Song = await GetFullLinkBySongName(track.Song);

            return Ok(track);
        }

        [HttpPost]
        [Route("GetTrackByIds")]
        public async Task<IActionResult> GetTrackByIdsAsync(FindByIdVM[] model)
        {
            var tracks = await _trackService.GetTrackByIdsAsync(model);

            foreach (var track in tracks)
            {
                track.Image = await GetFullLinkByImageName(track.Image);
                track.Background = await GetFullLinkByImageName(track.Background);
                track.Song = await GetFullLinkBySongName(track.Song);
            }

            return Ok(tracks);
        }


        [HttpPost]
        [Route("GetLikedTracksByUserId")]
        public async Task<IActionResult> GetLikedTracksByUserIdAsync(FindByIdVM model)
        {
            var tracks = await _trackService.GetLikedTracksByUserIdAsync(model.Id);

            foreach (var track in tracks)
            {
                track.Image = await GetFullLinkByImageName(track.Image);
                track.Background = await GetFullLinkByImageName(track.Background);
                track.Song = await GetFullLinkBySongName(track.Song);
            }

            return Ok(tracks);
        }

        [HttpPost("GetImageLinksByTrackId")]
        public async Task<IActionResult> GetImageLinksByTrackId(FindByIdVM model)
        {

            var image = await _trackService.GetMainImageByIdAsync(model.Id);


            string port = string.Empty;
            if (Request.Host.Port != null)
                port = ":" + Request.Host.Port.ToString();
            var url = $@"https://amazonclone.monster/api/{DirectoriesInProject.MusicImages}/{image + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
            return Ok(new ImageLinkVM { Link = url, Id = model.Id });
        }

        [HttpPost]
        [Route("UploadImage")]
        public async Task<IActionResult> UploadImage([FromBody] UploadImageDTO model)
        {
            string fileName = await _imageService.SaveImageAsync(model.Image, DirectoriesInProject.MusicImages);


            string port = string.Empty;
            if (Request.Host.Port != null)
                port = ":" + Request.Host.Port.ToString();

            var url = $@"https://amazonclone.monster/api/{DirectoriesInProject.MusicImages}/{fileName + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
            return Ok(new ImageLinkVM { Link = url, Id = 0 });
        }

        [HttpPost]
        [Route("GetFullLinkByImageName")]
        public async Task<string> GetFullLinkByImageName([FromBody] string image)
        {
            string port = string.Empty;
            if (Request.Host.Port != null)
                port = ":" + Request.Host.Port.ToString();

            var url = $@"https://amazonclone.monster/api/{DirectoriesInProject.MusicImages}/{image + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
            return  url;
        }

        [HttpPost]
        [Route("GetFullLinkBySongName")]
        public async Task<string> GetFullLinkBySongName([FromBody] string song)
        {
            string port = string.Empty;
            if (Request.Host.Port != null)
                port = ":" + Request.Host.Port.ToString();

            var url = $@"https://amazonclone.monster/api/{DirectoriesInProject.MusicFiles}/{song}";
            return url;
        }

        [HttpPost]
        [Route("SetLikedTrack")]
        public async Task<TrackVM> SetLikedTrackAsync([FromBody] SetLikedTrackDTO model)
        {
            var res = await _trackService.SetLikedTrackAsync(model);
            return res;
        }

        [HttpGet]
        [Route("GetTrackHistory")]
        public async Task<List<TrackHistory>> GetTrackHistoryAsync()
        {
            var res = await _trackService.GetAllTrackHistoryAsync();
            return res;
        }

        [HttpPost]
        [Route("AddTrackHistory")]
        public async Task<TrackHistory> AddTrackHistoryAsync([FromBody] AddTrackHistoryDTO model)
        {
            var res = await _trackService.AddTrackHistoryAsync(model);
            return res;
        }

        [HttpPost]
        [Route("GetTrackHistoryByUserId")]
        public async Task<List<TrackVM>> GetTrackHistoryByUserIdAsync([FromBody] FindByIdVM model)
        {
            var tracks = await _trackService.GetTrackHistoryByUserIdAsync(model);
            foreach (var track in tracks)
            {
                track.Image = await GetFullLinkByImageName(track.Image);
                track.Background = await GetFullLinkByImageName(track.Background);
                track.Song = await GetFullLinkBySongName(track.Song);
            }

            return tracks;
        }

        [HttpPost]
        [Route("DeleteTrack")]
        public async Task DeleteTrackAsync([FromBody] FindByIdVM model)
        {
            await _trackService.DeleteTrackAsync(model.Id);
        }


        [HttpGet]
        [Route("GetTrackComments")]
        public async Task<List<TrackCommentVM>> GetTrackCommentsAsync()
        {
            var res = await _trackCommentService.GetTrackCommentsAsync();
            return res;
        }

        [HttpPost]
        [Route("AddTrackComment")]
        public async Task<TrackComment> AddTrackCommentAsync(TrackCommentDTO model)
        {
            var res = await _trackCommentService.AddTrackCommentAsync(model);
            return res;
        }


        [HttpPost]
        [Route("GetTrackCommentsByTrackId")]
        public async Task<List<TrackCommentVM>> GetTrackCommentsByTrackIdAsync(FindByIdVM model)
        {
            var res = await _trackCommentService.GetTrackCommentsByTrackIdAsync(model.Id);
            return res;
        }

        [HttpPost]
        [Route("GetSearchTracksByName")]
        public async Task<IActionResult> GetSearchTracksByNameAsync(SearchTrackDTO model)
        {
            var searchInPlayer = await _trackService.GetSearchTracksByNameAsync(model.Name);
            
            return Ok(searchInPlayer);
        }


        [HttpPost]
        [Route("Subscribe")]
        public async Task<IActionResult> SubscribeAsync(SubscribeDTO model)
        {
            var response = await _trackService.SubscribeAsync(model);
            
            return Ok(response);
        }

        [HttpPost]
        [Route("GetSubscribers")]
        public async Task<IActionResult> GetSubscribersByUserIdAsync(FindByIdVM model)
        {
            var response = await _trackService.GetSubscribersByUserIdAsync(model.Id);

            return Ok(response);
        }

        [HttpPost]
        [Route("GetMySubscribes")]
        public async Task<IActionResult> GetMySubscribesByUserIdAsync(FindByIdVM model)
        {
            var response = await _trackService.GetMySubscribesByUserIdAsync(model.Id);

            return Ok(response);
        }


    }
}
