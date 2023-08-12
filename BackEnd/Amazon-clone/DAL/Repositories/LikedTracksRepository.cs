using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class LikedTracksRepository : GenericRepository<LikedTracks>, ILikedTracksRepository
    {
        public LikedTracksRepository(AppEFContext context) : base(context)
        {
        }
    }
}
