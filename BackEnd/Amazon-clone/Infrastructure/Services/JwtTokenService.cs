using DAL.Entities.Identity;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Infrastructure.Models;
using DAL.Entities;
using ExternalLoginRequest = DAL.Entities.ExternalLoginRequest;
using Microsoft.Extensions.Configuration;
using Infrastructure.Settings;
using DAL.Constants;
using Infrastructure.Enum_s;

namespace Infrastructure.Services
{
    public interface IJwtTokenService
    {
        Task<string> CreateToken(User user);
        Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalLoginRequest request);
    }
    public class JwtTokenService : IJwtTokenService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        //private readonly GoogleAuthSettings _googleAuthSettings;
        public JwtTokenService(IConfiguration configuration,
            UserManager<User> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
            //,GoogleAuthSettings googleAuthSettings

            //_googleAuthSettings = googleAuthSettings;
        }

        public async Task<string> CreateToken(User user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var phoneNumber = "";
            var image = "";
            if (user.PhoneNumber!= null)
            {
                phoneNumber = user.PhoneNumber;
            }

            if(user.AvatarImage!= null)
            {
                image = $@"https://amazonclone.monster/api/{DirectoriesInProject.ProductImages}/{user.AvatarImage + "_" + (int)Qualities.QualitiesSelector.HIGH + ".jpg"}";
            }

            List<Claim> claims = new List<Claim>()
            {
                new Claim("name", user.FirstName),
                new Claim("id", user.Id.ToString()),
                new Claim("surname", user.LastName),
                new Claim("username", user.DisplayName),
                new Claim("avatar", image),
                new Claim("phoneNumber",phoneNumber),
                new Claim("email", user.Email)
            };

            foreach (var role in roles)
                claims.Add(new Claim("roles", role));

            var key = _configuration["JwtConfig:Secret"];

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
            string clientID = _configuration["GoogleAuthSettings:ClientId"];
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { clientID }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token, settings);
            return payload;
        }
    }
    public class Tokens
    {
        public string token { get; set; }
        public RefreshToken refreshToken { get; set; }
    }
}
