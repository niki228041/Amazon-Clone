using DAL.Entities.Music;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class TrackVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Background { get; set; }
        public string Image { get; set; }
        public int AlbumId_ { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        
        public List<int> GenresIds { get; set; }
        public string Song { get; set; }
        public List<GenreVM> Genres { get; set; }
        public List<int> WasLikedByUsers { get; set; }=new List<int>();
        public List<AllUsersVM> Subscribers { get; set; }=new List<AllUsersVM>();
        
        public int Views { get; set; }
        public int Comments { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime TrackHistoryDateCreated { get; set; }
    }
}
