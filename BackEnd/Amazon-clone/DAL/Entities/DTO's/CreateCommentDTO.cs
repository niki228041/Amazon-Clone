using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.DTO_s
{
    public class CreateCommentDTO
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public int Stars { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public int UserId { get; set; }
        public int? ProductId { get; set; }
        public List<ImageUploadDTO> Images { get; set; }
    }
}
