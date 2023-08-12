using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class TrackForLikedTracksVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Background { get; set; }
        public string Image { get; set; }
        public int AlbumId_ { get; set; }
        public int UserId { get; set; }
        public List<int> GenresIds { get; set; }
        public string Song { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
