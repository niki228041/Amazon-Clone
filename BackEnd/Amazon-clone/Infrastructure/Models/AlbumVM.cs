using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class AlbumVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Background { get; set; }
        public string Username { get; set; }
        public int UserId { get; set; }
        public List<TrackVM> Tracks { get; set; }
    }
}
