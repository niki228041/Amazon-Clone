using DAL.Entities;
using DAL.Entities.FilterEntities;
using DAL.Entities.Music;
using Infrastructure.Models;
using Infrastructure.Models.Caterories;
using Services;

namespace Infrastructure.Interfaces
{ 
    public interface ITrackService
    {
        Task<Track> CreateTrackAsync(TrackVM model);
        Task<List<Track>> GetAllAsync();
        Task<string> GetMainImageByIdAsync(int id);
        Task<string> GetBackgroundImageByIdAsync(int id);

    }
}