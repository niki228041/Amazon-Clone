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

        //Every ProductImage have a product
        public ICollection<Track> Tracks { get; set; }
    }
}
