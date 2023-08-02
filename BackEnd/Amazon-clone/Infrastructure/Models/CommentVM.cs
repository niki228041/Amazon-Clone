using DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class CommentVM
    {
        public int id { get; set; }
        public int stars { get; set; }
        public string title { get; set; }
        public string message { get; set; }
        public DateTime DateCreated { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public int? UserId { get; set; }
        public string UserName { get; set; }
        public int? ProductId { get; set; }
    }
}
