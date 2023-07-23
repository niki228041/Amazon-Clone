using AutoMapper;
using DAL.Constants;
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

        public TrackController(IMapper mapper, ITrackService trackService)
        {
            _mapper = mapper;
            _trackService = trackService;
        }


        [HttpPost]
        [Route("CreateTrack")]
        public async Task<IActionResult> CreateTrackAsync(TrackVM model)
        {
            var track = await _trackService.CreateTrackAsync(model);
            return Ok(track);
        }

        [HttpGet]
        [Route("GetAllTracks")]
        public async Task<IActionResult> GetAllTracksAsync()
        {
            var tracks = await _trackService.GetAllAsync();
            return Ok(tracks);
        }

        [HttpPost("GetImageLinksByTrackId")]
        public async Task<IActionResult> GetImageLinksByProductsIds(FindByIdVM model)
        {

            var image = await _trackService.GetMainImageByIdAsync(model.Id);


            string port = string.Empty;
            if (Request.Host.Port != null)
                port = ":" + Request.Host.Port.ToString();
            var url = $@"{Request.Scheme}://{Request.Host.Host}{port}/{DirectoriesInProject.MusicImages}/{image + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
            return Ok(new ImageLinkVM { Link = url, Id = model.Id });
        }
    }
}
