using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblProductImages")]
    public class ProductImage
	{
        [Key]
        public int Id { get; set; }

        [MaxLength(25)]
        [Required(ErrorMessage = "Field name is required")]
        public string Name { get; set; }

        public int Priority { get; set; }

        public bool IsMainImage { get; set; }

        //Foreign keys:

        //Every ProductImage have a product
        public Product Product { get; set; }

        [ForeignKey(nameof(Product))]
        public int? ProductId { get; set; }

    }
}


