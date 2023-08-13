using DAL.Entities;
using DAL.Entities.Music;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class TrackGenreRepository : GenericRepository<TrackGenre>, ITrackGenreRepository
    {
        public TrackGenreRepository(AppEFContext context) : base(context)
        {
        }
    }
}
