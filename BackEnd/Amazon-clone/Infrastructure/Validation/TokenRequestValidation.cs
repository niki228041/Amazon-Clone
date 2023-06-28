using System;
using FluentValidation;
using Infrastructure.Models;

namespace Infrastructure.Validation
{
    public class TokenRequestValidation : AbstractValidator<TokenRequestVM>
    {
        public TokenRequestValidation()
        {
            RuleFor(r => r.Token).NotEmpty();
            RuleFor(r => r.RefreshToken).NotEmpty();
        }
    }
}

