using DAL.Entities;
using DAL.Entities.Music;
using DAL.Interfaces;

namespace DAL.Repositories
{
    public class TrackRepository : GenericRepository<Track>,
        ITrackRepository
    {
        public TrackRepository(AppEFContext context) : base(context)
        {
        }
        
    }
}
