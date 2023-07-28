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
        Task<Track> CreateTrackAsync(TrackDTO model);
        Task<List<TrackVM>> GetAllAsync();
        Task<string> GetMainImageByIdAsync(int id);
        Task<string> GetBackgroundImageByIdAsync(int id);

    }
}