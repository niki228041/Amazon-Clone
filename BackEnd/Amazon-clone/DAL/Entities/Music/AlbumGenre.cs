using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.Music
{
    public class AlbumGenre : BaseEntity<int>
    {
        public virtual Album Album { get; set; }
        [ForeignKey(nameof(Album))]
        public int? AlbumId { get; set; }

        public virtual Genre Genre { get; set; }
        [ForeignKey(nameof(Genre))]
        public int? GenreId { get; set; }
    }
}
