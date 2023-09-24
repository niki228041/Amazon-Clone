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
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FathersName { get; set; }
        public string MiddleName { get; set; }
        public string AvatarImage { get; set; }

        public string Gender { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Date of Birth")]
        public DateTime DateOfBirth { get; set; }


        [DataType(DataType.PhoneNumber)]
        public override string PhoneNumber { get; set; }

        [Required(ErrorMessage = "The Email field is required.")]
        [EmailAddress(ErrorMessage = "Invalid Email format.")]
        public override string Email { get; set; }


        [DataType(DataType.Password)]
        public override string PasswordHash { get; set; }


        //Foreign keys:

            //Every User have a company
        public Company Company { get; set; }

        [ForeignKey(nameof(Company))]
        public int? CompanyId { get; set; }

        public bool isBossOfCompany { get; set; }


        // Navigation property to represent the one-to-many relationship
        public ICollection<Address> Addresses { get; set; }


        // Navigation property for users who follow this user
        public virtual ICollection<UserFollower> Followers { get; set; } = new List<UserFollower>();

        // Navigation property for users whom this user follows
        public virtual ICollection<UserFollower> Following { get; set; } = new List<UserFollower>();

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<UserRoleEntity> UserRoles { get; set; }
        public virtual ICollection<Track> Tracks { get; set; }
        public virtual ICollection<LikedTracks> LikedTracks { get; set; }
        public virtual ICollection<TrackHistory> TrackHistory { get; set; }
        public virtual ICollection<Card> Cards { get; set; }
    }
}

