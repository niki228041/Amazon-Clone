using DAL.Entities.FilterEntities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblProducts")]
    public class Product : BaseEntity<int>
	{
        [Required(ErrorMessage = "The Price field is required.")]
        [Range(1, float.MaxValue, ErrorMessage = "Min price is 1 and max price is 3.402823E+38")]
        public float Price { get; set; }



        [Range(0, 100, ErrorMessage = "The Discount field must be between 0 and 100.")]
        public int Discount { get; set; }



        [Required(ErrorMessage = "The Description field is required.")]
        public string Description { get; set; }



        [Required(ErrorMessage = "The Quantity field is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "The Quantity field must be a positive value.")]
        public int Quantity { get; set; }



        public bool IsInTheStock { get; set; }



        [Range(1, int.MaxValue, ErrorMessage = "The NumberOfDaysForDelivery field must be a positive value.")]
        public int NumberOfDaysForDelivery { get; set; }



        [Required(ErrorMessage = "The Address field is required.")]
        public string Address { get; set; }



        [DataType(DataType.DateTime)]
        public DateTime Created_At { get; set; } = DateTime.UtcNow;


    //Foreign keys:

        //Every product have a company
        public Company Company { get; set; }

        [ForeignKey(nameof(Company))]
        public int? CompanyId { get; set; }

        //Every product have a company
        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }


        //Every product have a category
        public Category Category { get; set; }

        [ForeignKey(nameof(Category))]
        public int? CategoryId { get; set; }

        public virtual ICollection<VariantProduct> VariantProducts { get; set; } = new List<VariantProduct>();
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<ProductImage> ProductImages { get; set; }
        public virtual ICollection<OrderedProduct> OrderedProducts { get; set; }
    }
}

