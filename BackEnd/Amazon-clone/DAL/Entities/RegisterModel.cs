using System;
namespace DAL.Entities
{
	public class RegisterModel
	{
        public string email { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string password { get; set; }
        public string CheckPassword { get; set; }
        public string AvatarImage { get; set; }
    }
}


