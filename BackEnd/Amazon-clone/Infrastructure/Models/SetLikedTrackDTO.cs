using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class SetLikedTrackDTO
    {
        public int TrackId { get; set; }
        public int UserId { get; set; }
        public bool isLiked { get; set; }
    }
}
