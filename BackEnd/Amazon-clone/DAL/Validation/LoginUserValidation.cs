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
            RuleFor(r => r.email).NotEmpty().EmailAddress().WithMessage("Емайл є обов'язковим полем!");
        }
    }
}

