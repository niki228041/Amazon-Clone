using DAL.Entities.DTO_s;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }




        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAllAsync()
        {
            var res = await _commentService.GetAllAsync();
            return Ok(res);
        }

        [HttpPost]
        [Route("CreateComment")]
        public async Task<IActionResult> CreateCommentAsync(CreateCommentDTO model)
        {
            var res = await _commentService.CreateCommentAsync(model);
            return Ok(res);
        }

        [HttpPost]
        [Route("GetCommentsByProductId")]
        public async Task<IActionResult> GetCommentsByProductIdAsync(FindByIdVM model)
        {
            var res = await _commentService.GetCommentsByProductIdAsync(model.Id);
            return Ok(res);
        }

        [HttpPost]
        [Route("GetCountOfCommentsByProductId")]
        public async Task<IActionResult> GetCountOfCommentsByProductIdAsync(FindByIdVM model)
        {
            var res = await _commentService.GetCommentsByProductIdAsync(model.Id);
            return Ok(res);
        }

        [HttpPost]
        [Route("CanLeaveComment")]
        public async Task<IActionResult> CanLeaveCommentAsync(CanLeaveCommentVM model)
        {
            var res = await _commentService.CanLeaveCommentAsync(model);
            return Ok(res);
        }

    }
}
