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

        public int Image { get; set; }

    //Foreign keys:

        //Every User have a company
        public Comment Comment { get; set; }

        [ForeignKey(nameof(Comment))]
        public int? CommentId { get; set; }
    }
}

