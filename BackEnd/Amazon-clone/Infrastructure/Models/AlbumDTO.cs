using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class AlbumDTO
    {
        public string Title { get; set; }
        public string Background { get; set; }
        public int UserId { get; set; }
        public List<int> TracksIds { get; set; }
    }
}
