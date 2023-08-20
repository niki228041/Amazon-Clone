using DAL.Entities;
using DAL.Entities.Music;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IGenreService _genreService;

        public PlayerController(IGenreService genreService)
        {
            _genreService= genreService;
        }


    }
}
