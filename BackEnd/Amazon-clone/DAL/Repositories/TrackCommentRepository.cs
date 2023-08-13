using DAL.Entities;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class TrackCommentRepository : GenericRepository<TrackComment>, ITrackCommentRepository
    {
        public TrackCommentRepository(AppEFContext context) : base(context)
        {
        }
    }
}
