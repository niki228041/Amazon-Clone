using DAL.Entities.Identity;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using ShopApi.Settings;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Infrastructure.Models;
using ShopApi.Constants;

namespace ShopApi.Services
{
    public interface IJwtTokenService
    {
        Task<string> CreateToken(UserEntity user);
        Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalLoginRequest request);
    }
    public class JwtTokenService : IJwtTokenService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<UserEntity> _userManager;
        private readonly GoogleAuthSettings _googleAuthSettings;
        public JwtTokenService(IConfiguration configuration,
            UserManager<UserEntity> userManager,
            GoogleAuthSettings googleAuthSettings)
        {
            _configuration = configuration;
            _userManager = userManager;
            _googleAuthSettings = googleAuthSettings;
        }

        public async Task<string> CreateToken(UserEntity user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            List<Claim> claims = new List<Claim>()
            {
                new Claim("name", user.FirstName),
                new Claim("surname", user.LastName),
                new Claim("username", user.UserName),
                new Claim("email", user.Email),
            };

            foreach (var role in roles)
                claims.Add(new Claim("roles", role));

            var key = _configuration.GetValue<string>("JwtKey");
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var signinCredentials = new SigningCredentials(signinKey,
                SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                expires: DateTime.Now.AddDays(10),
                claims: claims
                );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalLoginRequest request)
        {
            string clientID= _configuration["GoogleAuthSettings:ClientId"];
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { clientID }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token, settings);
            return payload;
        }
    }
}
