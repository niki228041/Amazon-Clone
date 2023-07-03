using DAL.Entities.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.Music
{
    [Table("tblGenre")]
    public class Genre : BaseEntity<int>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public virtual ICollection<TrackGenre> TrackGenre { get; set; }
    }
}
