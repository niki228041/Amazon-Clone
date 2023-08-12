using DAL.Entities.Music;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class LikedTracks : BaseEntity<int>
    {
        public virtual Track Track { get; set; }
        [ForeignKey(nameof(Track))]
        public int? TrackId { get; set; }

        public virtual User User { get; set; }
        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }
    }
}
