using System;
namespace Infrastructure.Models
{
	public class AllUsersVM
	{
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Role { get; set; }
        public string AvatarImage { get; set; }
    }
}

