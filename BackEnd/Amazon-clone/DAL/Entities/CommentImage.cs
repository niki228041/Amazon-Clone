using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblCommentImages")]
    public class CommentImage : BaseEntity<int>
	{
        public int Priority { get; set; }

    //Foreign keys:

        //Every User have a company
        public Comment Comment { get; set; }

        [ForeignKey(nameof(Comment))]
        public int? CommentId { get; set; }
    }
}

