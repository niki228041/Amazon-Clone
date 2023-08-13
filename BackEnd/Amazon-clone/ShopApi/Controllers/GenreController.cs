using AutoMapper;
using DAL.Entities.FilterEntities;
using DAL.Entities.Music;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IGenreService _genreService;
        private readonly IMapper _mapper;

        public GenreController(IMapper mapper, IGenreService genreRepository)
        {
            _mapper = mapper;
            _genreService = genreRepository;
        }


        [HttpPost]
        [Route("CreateGenre")]
        public async Task<IActionResult> CreateGenreAsync(GenreDTO model)
        {
            var genre = await _genreService.CreateGenreAsync(model);
            return Ok(genre);
        }

        [HttpGet]
        [Route("GetAllGenres")]
        public async Task<IActionResult> GetAllGenresAsync()
        {
            var genres = await _genreService.GetAllGenresAsync();
            return Ok(genres);
        }

    }
}
