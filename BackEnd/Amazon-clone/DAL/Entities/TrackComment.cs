using DAL.Entities.Music;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class TrackComment : BaseEntity<int>
    {
        public string Message { get; set; }


        //Foreign keys:

        //Every TrackComment have a Track
        public Track Track { get; set; }

        [ForeignKey(nameof(Track))]
        public int? TrackId { get; set; }

        //Every TrackComment have a User
        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }
    }
}
