using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblAddresses")]
    public class Address
	{
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Field street is required")]
        [MaxLength(100, ErrorMessage = "The Street field cannot exceed 100 characters.")]
        public string Street { get; set; }


        [Required(ErrorMessage = "Field building is required")]
        [MaxLength(100, ErrorMessage = "The Building field cannot exceed 100 characters.")]
        public string Building { get; set; }


        [Required(ErrorMessage = "Field city is required")]
        [MaxLength(50, ErrorMessage = "The City field cannot exceed 50 characters.")]
        public string City { get; set; }


        [Required(ErrorMessage = "Field state is required")]
        [MaxLength(50, ErrorMessage = "The State field cannot exceed 50 characters.")]
        public string State { get; set; }


        [Required(ErrorMessage = "Field postcode is required")]
        [MaxLength(10)]
        public string Postcode { get; set; }


    //Foreign keys:

        //Every User have a company
        public Order Order { get; set; }

        [ForeignKey(nameof(Order))]
        public int? OrderId { get; set; }
    }
}

