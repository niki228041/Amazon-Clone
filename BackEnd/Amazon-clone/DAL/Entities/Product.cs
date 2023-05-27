using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblProducts")]
    public class Product : BaseEntity<int>
	{
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "The Name field is required.")]
        public string Name { get; set; }

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
        public Address Address { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime Created_At { get; set; }

        public int Category_Id { get; set; }

        public Category Category { get; set; }

        public int Company_Id { get; set; }

        public Company Company { get; set; }

        public int Order_Id { get; set; }

        public Order Order { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public ICollection<ProductImage> ProductImages { get; set; }
    }
}

