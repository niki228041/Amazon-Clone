using System;
using FluentValidation;
using Infrastructure.Models;

namespace Infrastructure.Validation
{
    public class RegisterUserValidation : AbstractValidator<RegisterViewModel>
    {
        public RegisterUserValidation()
        {
            RuleFor(r => r.email).EmailAddress().NotEmpty();
            RuleFor(r => r.password).NotEmpty().MinimumLength(6);
            RuleFor(r => r.CheckPassword).NotEmpty().MinimumLength(6);
        }
    }
}

