using System;
using FluentValidation;
using Infrastructure.Models;

namespace Infrastructure.Validation
{
    public class LoginUserValidation : AbstractValidator<LoginViewModel>
    {
        public LoginUserValidation()
        {
            RuleFor(r => r.email).NotEmpty().EmailAddress();
            RuleFor(r => r.password).NotEmpty().MinimumLength(6);
        }
    }
}

