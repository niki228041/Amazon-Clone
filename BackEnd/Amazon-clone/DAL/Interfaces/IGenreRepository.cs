using DAL.Entities;
using DAL.Entities.Music;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IGenreRepository : IGenericRepository<Genre, int>
    {
    }
}
