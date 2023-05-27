using System;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DAL.Entities.Identity;

namespace DAL.Entities
{

    public class User : IdentityUser<int>
    {

        [Required]
        [MaxLength(25)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(25)]
        public string LastName { get; set; }

        [Required(ErrorMessage = "The Email field is required.")]
        [EmailAddress(ErrorMessage = "Invalid Email format.")]
        public override string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public override string PhoneNumber { get; set; }

        [Required(ErrorMessage = "The Password field is required.")]
        [DataType(DataType.Password)]
        public override string PasswordHash { get; set; }

        [StringLength(255)]
        public string AvatarImage { get; set; }

        public int Company_Id { get; set; }

        public Company Company { get; set; }

        public ICollection<Comment> Comments { get; set; }

        public ICollection<Order> Orders { get; set; }

        public virtual ICollection<UserRoleEntity> UserRoles { get; set; }
    }
}

