using System;
using System.Buffers.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("tblAddresses")]
    public class Address:BaseEntity<int>
	{
        [Required(ErrorMessage = "Field street is required")]
        [MaxLength(100, ErrorMessage = "The Street field cannot exceed 100 characters.")]
        public string Street { get; set; }


        [Required(ErrorMessage = "Field city is required")]
        [MaxLength(50, ErrorMessage = "The City field cannot exceed 50 characters.")]
        public string City { get; set; }

        public string Phone { get; set; }

        public string FullName { get; set; }

        public string Country { get; set; }
        public bool IsDefault { get; set; }


        [Required(ErrorMessage = "Field postcode is required")]
        [MaxLength(10)]
        public string Postcode { get; set; }


        //Foreign keys:
            //Every Address have a Orders
        public virtual ICollection<Order> Orders { get; set; }


        //Foreign keys:
            //Every Address have a User
        public User User { get; set; }

        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }
    }
}

