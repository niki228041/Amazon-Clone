using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblProductImages")]
    public class ProductImage : BaseEntity<int>
    {
        public int Priority { get; set; }
        public bool IsMainImage { get; set; }

        //Foreign keys:

        //Every ProductImage have a product
        public Product Product { get; set; }

        [ForeignKey(nameof(Product))]
        public int? ProductId { get; set; }

    }
}


