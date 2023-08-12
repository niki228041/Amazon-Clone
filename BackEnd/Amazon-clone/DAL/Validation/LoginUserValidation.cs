using Infrastructure.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entities;

namespace DAL.Validation
{
    public class LoginUserValidation : AbstractValidator<LoginViewModel>
    {
        public LoginUserValidation()
        {
            RuleFor(r => r.email).NotEmpty().EmailAddress().WithMessage("Email must be not empty!!");
            RuleFor(r => r.password).NotEmpty().MinimumLength(6).WithMessage("Password minimum lengtg is 6 chars!!");
        }
    }
}

