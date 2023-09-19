using DAL.Constants;
using Infrastructure.Enum_s;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _albumService;

        public AlbumController(IAlbumService albumService)
        {
            _albumService = albumService;
        }

        [HttpPost]
        [Route("AddAlbum")]
        public async Task<IActionResult> AddAlbumAsync(AlbumDTO model)
        {
            var res = await _albumService.AddAlbumAsync(model);
            return Ok(res);
        }

        [HttpGet]
        [Route("GetAllAlbums")]
        public async Task<IActionResult> GetAllAlbumsAsync()
        {
            var res = await _albumService.GetAllAlbumsAsync();
            return Ok(res);
        }

        [HttpPost]
        [Route("DeleteAlbumById")]
        public async Task<IActionResult> DeleteAlbumByIdAsync(FindByIdVM model)
        {
            await _albumService.DeleteAlbumByIdAsync(model.Id);
            return Ok();
        }

        [HttpPost]
        [Route("GetAlbumsByUserId")]
        public async Task<IActionResult> GetAlbumsByUserIdAsync(FindByIdVM model)
        {
            var res = await _albumService.GetAlbumsByUserIdAsync(model.Id);
            return Ok(res);
        }

        [HttpPost]
        [Route("GetAlbumById")]
        public async Task<IActionResult> GetAlbumByIdAsync(FindByIdVM model)
        {
            var res = await _albumService.GetAlbumByIdAsync(model.Id);
            return Ok(res);
        }

    }
}
