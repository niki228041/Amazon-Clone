using AutoMapper;
using DAL.Entities.Music;
using DAL.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Models;
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
        private readonly IMapper _mapper;

        public GenreService(IGenreRepository genreRepository, IMapper mapper) { 
            _genreRepository= genreRepository;
            _mapper= mapper;
        }

        public async Task<Genre> CreateGenreAsync(GenreVM model)
        {
            var genre = _mapper.Map<GenreVM,Genre>(model);
            await _genreRepository.Create(genre);
            return genre;
        }

        public async Task<List<Genre>> GetAllGenresAsync()
        {
            var list = _genreRepository.GetAll().ToList();
            return list;
        }
    }
}
