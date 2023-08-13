using AutoMapper;
using DAL.Entities.Music;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class GenreService : IGenreService
    {
        private readonly IGenreRepository _genreRepository;
        private readonly ITrackGenreRepository _trackGenreRepository;
        private readonly IMapper _mapper;

        public GenreService(IGenreRepository genreRepository, IMapper mapper,ITrackGenreRepository trackGenreRepository) { 
            _genreRepository= genreRepository;
            _mapper= mapper;
            _trackGenreRepository = trackGenreRepository;
        }

        public async Task<Genre> CreateGenreAsync(GenreDTO model)
        {
            var genre = _mapper.Map<GenreDTO, Genre>(model);
            await _genreRepository.Create(genre);
            return genre;
        }

        public async Task<List<GenreVM>> GetGenresByTrackIdAsync(int id)
        {
            var trackGenres = await _trackGenreRepository.GetAll()
                .Where(tg => tg.TrackId == id)
                .Select(tg => tg.Genre)
                .ToListAsync();

            var genreVms = _mapper.Map<List<Genre>, List<GenreVM>>(trackGenres);

            return genreVms;
        }


        public async Task<List<Genre>> GetAllGenresAsync()
        {
            var list = _genreRepository.GetAll().ToList();
            return list;
        }
    }
}
