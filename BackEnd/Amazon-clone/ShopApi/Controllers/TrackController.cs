using AutoMapper;
using DAL.Constants;
using DAL.Entities.DTO_s;
using DAL.Entities.Music;
using DAL.Interfaces;
using Infrastructure.Enum_s;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackController : ControllerBase
    {
        private readonly ITrackService _trackService;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;

        public TrackController(IMapper mapper, ITrackService trackService, IImageService imageService)
        {
            _mapper = mapper;
            _trackService = trackService;
            _imageService = imageService;
        }


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

        [HttpPost("GetImageLinksByTrackId")]
        public async Task<IActionResult> GetImageLinksByTrackId(FindByIdVM model)
        {

            var image = await _trackService.GetMainImageByIdAsync(model.Id);


            string port = string.Empty;
            if (Request.Host.Port != null)
                port = ":" + Request.Host.Port.ToString();
            var url = $@"{Request.Scheme}://{Request.Host.Host}{port}/{DirectoriesInProject.MusicImages}/{image + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
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

            var url = $@"{Request.Scheme}://{Request.Host.Host}{port}/{DirectoriesInProject.MusicImages}/{fileName + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
            return Ok(new ImageLinkVM { Link = url, Id = 0 });
        }

        [HttpPost]
        [Route("GetFullLinkByImageName")]
        public async Task<string> GetFullLinkByImageName([FromBody] string image)
        {
            string port = string.Empty;
            if (Request.Host.Port != null)
                port = ":" + Request.Host.Port.ToString();

            var url = $@"{Request.Scheme}://{Request.Host.Host}{port}/{DirectoriesInProject.MusicImages}/{image + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
            return  url;
        }

        [HttpPost]
        [Route("GetFullLinkBySongName")]
        public async Task<string> GetFullLinkBySongName([FromBody] string song)
        {
            string port = string.Empty;
            if (Request.Host.Port != null)
                port = ":" + Request.Host.Port.ToString();

            var url = $@"{Request.Scheme}://{Request.Host.Host}{port}/{DirectoriesInProject.MusicFiles}/{song}";
            return url;
        }
    }
}
