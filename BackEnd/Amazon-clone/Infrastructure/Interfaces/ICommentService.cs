using DAL.Entities;
using DAL.Entities.DTO_s;
using Infrastructure.Models;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface ICommentService
    {
        Task<List<Comment>> GetAllAsync();
        Task<ServiceResponse> CreateCommentAsync(CreateCommentDTO comment);
        Task<List<CommentVM>> GetCommentsByProductIdAsync(int id);
        Task<ServiceResponse> CanLeaveCommentAsync(CanLeaveCommentVM model);
    }
}
