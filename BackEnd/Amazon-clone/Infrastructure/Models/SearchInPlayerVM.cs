using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class SearchInPlayerVM
    {
        public List<TrackVM> Tracks { get; set; }
        public List<AllUsersVM> Users { get; set; }
        public List<AlbumVM> Albums { get; set; }
    }
}
