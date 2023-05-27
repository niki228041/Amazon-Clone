using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblCommentImages")]
    public class CommentImage
	{
        [Key]
        public int Id { get; set; }

        [MaxLength(25)]
        [Required(ErrorMessage = "Field name is required")]
        public string Name { get; set; }

        public int Priority { get; set; }

        public int Image_Id { get; set; }

        public Comment Comment { get; set; }
    }
}

