using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface ICommentImageService
    {
        Task CreateCommentImageAsync(CommentImage image);
    }
}
