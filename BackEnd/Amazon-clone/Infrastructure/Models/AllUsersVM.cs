using System;
namespace Infrastructure.Models
{
	public class AllUsersVM
	{
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Role { get; set; }
    }
}

