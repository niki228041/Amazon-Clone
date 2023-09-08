using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.Music
{
    public class TrackAlbum : BaseEntity<int>
    {
        public virtual Track Track { get; set; }
        [ForeignKey(nameof(Track))]
        public int? TrackId { get; set; }

        public virtual Album Album { get; set; }
        [ForeignKey(nameof(Album))]
        public int? AlbumId { get; set; }
    }
}
