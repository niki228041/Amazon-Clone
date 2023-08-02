using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
	public class ResetPasswordVM
	{
        //[Required]
        //[EmailAddress]
        //public string Email { get; set; }

        //[Required]
        //[StringLength(100, ErrorMessage = "Password must be at least 6 characters long", MinimumLength = 6)]
        //[DataType(DataType.Password)]
        //public string Password { get; set; }

        //[DataType(DataType.Password)]
        //[Display(Name = "Confirm password")]
        //[Compare("Password", ErrorMessage = "Passwords mismatch")]
        //public string ConfirmPassword { get; set; }

        //public string Code { get; set; }

        public string UserId { get; set; }
        public string Token { get; set; }
        public string Password { get; set; }
    }
}