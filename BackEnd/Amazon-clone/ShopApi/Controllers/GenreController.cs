using AutoMapper;
using DAL.Entities.FilterEntities;
using DAL.Entities.Music;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IGenreService _genreRepository;
        private readonly IMapper _mapper;

        public GenreController(IMapper mapper,IGenreRepository genreRepository)
        {
            _mapper = mapper;
            //_genreRepository = genreRepository;
        }



        //[HttpGet]
        //[Route("GetAll")]
        //public async Task<IActionResult> GetAllAsync()
        //{
        //    //var res = await _commentService.GetAllAsync();
        //    return Ok(res);
        //}

        //[HttpPost]
        //[Route("CreateGenre")]
        //public async Task<IActionResult> CreateOptionsAsync(CreateGenreVM model)
        //{
        //    var genre = new Genre();

        //    await _genreRepository.Create();

        //    foreach (var variant in model.Variants)
        //    {
        //        await _variantRepository.Create(new Variant { Title = variant.Title, OptionsId = newOptions.Id });
        //    }

        //    return Ok("OK");
        //}

    }
}
