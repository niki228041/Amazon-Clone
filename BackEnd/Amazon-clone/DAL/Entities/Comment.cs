using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DAL.Entities.Identity;

namespace DAL.Entities
{
    [Table("tblComments")]
    public class Comment : BaseEntity<int>
	{

        [Required(ErrorMessage = "The Title field is required.")]
        [MaxLength(100, ErrorMessage = "The Title field cannot exceed 100 characters.")]
        public string Title { get; set; }


        [Required(ErrorMessage = "The message field is required.")]
        [MaxLength(500, ErrorMessage = "The message field cannot exceed 500 characters.")]
        public string Message { get; set; }


        [Range(0, 5, ErrorMessage = "The Stars field must be between 0 and 5.")]
        public int Stars { get; set; }


        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; } 

        public int Likes { get; set; }

        public int Dislikes { get; set; }

    //Foreign keys:

        //Every User have a company
        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }


        //Every User have a company
        public Product Product { get; set; }

        [ForeignKey(nameof(Product))]
        public int? ProductId { get; set; }


        public ICollection<CommentImage> CommentImages { get; set; }
    }
}

