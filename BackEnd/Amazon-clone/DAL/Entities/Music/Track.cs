﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Music
{
    [Table("tblTrack")]
    public class Track : BaseEntity<int>
	{
        public string Title { get; set; }
        public string Song { get; set; }
        public string Background { get; set; }
        public string Image { get; set; }
        public int NumberOfPlays { get; set; }
        public int likes { get; set; }

        //Foreign keys:

        //Every Track have a album
        public Album Album { get; set; }

        [ForeignKey(nameof(Album))]
        public int? AlbumId { get; set; }

        //Every Track have a creator
        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }

        public virtual ICollection<TrackGenre> TrackGenre { get; set; }

    }
}

