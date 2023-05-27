using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblCategories")]
    public class Category : BaseEntity<int>
	{
        [Key]
        public int Id { get; set; }

        [MaxLength(25)]
        [Required(ErrorMessage = "Field name is required")]
        public string Name { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}

