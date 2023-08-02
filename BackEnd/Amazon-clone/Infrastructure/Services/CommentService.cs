using AutoMapper;
using DAL.Constants;
using DAL.Entities;
using DAL.Entities.DTO_s;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IImageService _imageService;
        private readonly ICommentImageService _commentImageService;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public CommentService(ICommentRepository commentRepository, IMapper mapper, IImageService imageService, ICommentImageService commentImageService, IUserRepository userRepository)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _imageService = imageService;
            _commentImageService = commentImageService;
            _userRepository = userRepository;
        }

        public async Task<ServiceResponse> CreateCommentAsync(CreateCommentDTO model)
        {
            Comment comment = _mapper.Map<CreateCommentDTO,Comment>(model);

            await _commentRepository.Create(comment);

            foreach (var img in model.Images)
            {
                var imgTemplate = img.Data;
                var imgFileName = await _imageService.SaveImageAsync(imgTemplate, DirectoriesInProject.CommentImages);

                CommentImage new_img_to_upload = new CommentImage { Name = imgFileName, CommentId = comment.Id };


                await _commentImageService.CreateCommentImageAsync(new_img_to_upload);
            }

            if (comment != null)
            {
                return new ServiceResponse
                {
                    IsSuccess = true,
                };
            }
            return null;

        }

        public async Task<List<CommentVM>> GetCommentsByProductIdAsync(int id)
        {
            List<Comment> comments = _commentRepository.GetAll().Where(comment=> comment.ProductId==id).ToList();
            var comments_vms = _mapper.Map<List<Comment>,List<CommentVM>>(comments);
            var users = await _userRepository.GetAllUsersAsync();

            for (int i = 0; i < comments_vms.Count; i++)
            {
                var foundedUser = users.FirstOrDefault(user => user.Id == comments_vms[i].UserId);
                if(!string.IsNullOrEmpty(foundedUser.UserName))
                {
                    comments_vms[i].UserName = foundedUser.UserName;
                }
            }
            return comments_vms;
        }


        public async Task<List<Comment>> GetAllAsync()
        {
            return _commentRepository.GetAll().ToList();
        }
    }
}
