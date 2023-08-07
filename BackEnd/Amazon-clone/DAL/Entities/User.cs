using System;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DAL.Entities.Identity;
using DAL.Entities.Music;

namespace DAL.Entities
{

    public class User : IdentityUser<int>
    {

        [StringLength(25)]
        public string FirstName { get; set; }


        [StringLength(25)]
        public string LastName { get; set; }


        [Required(ErrorMessage = "The Email field is required.")]
        [EmailAddress(ErrorMessage = "Invalid Email format.")]
        public override string Email { get; set; }


        [DataType(DataType.PhoneNumber)]
        public override string PhoneNumber { get; set; }


        [DataType(DataType.Password)]
        public override string PasswordHash { get; set; }


        //Foreign keys:

            //Every User have a company
        public Company Company { get; set; }

        [ForeignKey(nameof(Company))]
        public int? CompanyId { get; set; }

        public bool isBossOfCompany { get; set; }


        //Every User have an Adress
        public Address Address { get; set; }


        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<UserRoleEntity> UserRoles { get; set; }
        public virtual ICollection<Track> Tracks { get; set; }
        public virtual ICollection<Card> Cards { get; set; }
    }
}

