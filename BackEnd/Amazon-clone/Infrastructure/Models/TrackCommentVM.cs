using DAL.Entities.Music;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class TrackCommentVM
    {
        public string Message { get; set; }
        public DateTime DateCreated { get; set; }
        public AllUsersVM User { get; set; }
    }
}
