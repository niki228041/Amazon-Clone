using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblOrders")]
    public class Order
	{
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "The FullName field is required.")]
        [MaxLength(100, ErrorMessage = "The FullName field cannot exceed 100 characters.")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "The PhoneNumber field is required.")]
        [RegularExpression(@"^\+[1-9]\d{1,14}$", ErrorMessage = "Invalid PhoneNumber format. It should start with '+' followed by the country code and phone number.")]
        public string PhoneNumber { get; set; }

        public int Address_Id { get; set; }

        public Address Address { get; set; }

        [DataType(DataType.DateTime)]
        [Required]
        public DateTime Created_At { get; set; }

        public int User_Id { get; set; }

        public User User { get; set; }

        public int Company_Id { get; set; }

        public Company Company { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}

