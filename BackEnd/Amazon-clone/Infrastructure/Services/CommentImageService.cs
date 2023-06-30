using DAL.Entities;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CommentImageService : ICommentImageService
    {
        private readonly ICommentImageRepository _imageRepository;

        public CommentImageService(ICommentImageRepository commentImageRepository) {
            _imageRepository = commentImageRepository;
        }

        public async Task CreateCommentImageAsync(CommentImage image)
        {
            await _imageRepository.Create(image);
        }
    }
}
