using DAL.Entities;
using Infrastructure.Models;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IAlbumService
    {
        public Task<ServiceResponse> GetAllAlbumsAsync();
        public Task<ServiceResponse> AddAlbumAsync(AlbumDTO model);
        public Task<ServiceResponse> GetAlbumsByUserIdAsync(int userId);
        public Task<ServiceResponse> GetAlbumByIdAsync(int id);
        public Task DeleteAlbumByIdAsync(int id);
    }
}
