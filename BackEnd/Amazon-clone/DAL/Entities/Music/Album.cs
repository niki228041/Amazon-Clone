using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.Music
{
    [Table("tblAlbum")]
    public class Album : BaseEntity<int>
    {
        public string Title { get; set; }
        public string Background { get; set; }


        //Creator
        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }

        public virtual ICollection<TrackAlbum> TrackAlbums { get; set; }
    }
}
