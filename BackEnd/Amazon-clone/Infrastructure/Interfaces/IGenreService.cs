using DAL.Entities.Music;
using Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Interfaces
{
    public interface IGenreService
    {
        Task<Genre> CreateGenreAsync(GenreDTO model);
        Task<List<Genre>> GetAllGenresAsync();
        Task<List<GenreVM>> GetGenresByTrackIdAsync(int id);
    }
}
