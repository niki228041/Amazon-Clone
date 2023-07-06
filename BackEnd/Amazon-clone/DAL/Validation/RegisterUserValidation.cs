using System;
using DAL.Entities;
using FluentValidation;

namespace DAL.Validation
{
    public class RegisterUserValidation : AbstractValidator<RegisterModel>
    {
        public RegisterUserValidation()
        {
            RuleFor(r => r.email).EmailAddress().NotEmpty();
            RuleFor(r => r.password).NotEmpty().MinimumLength(6);
            RuleFor(r => r.CheckPassword).NotEmpty().MinimumLength(6);
        }
    }
}

