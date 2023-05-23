using DAL.Entities.Identity;
using Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Services;
using ShopApi.Constants;
using ShopApi.Services;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly IJwtTokenService _jwtTokenService;

        public AccountController(UserManager<UserEntity> userManager,
            IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.email);
            if (user == null)
            {
                return BadRequest(new { error = "Дані вказано не вірно" });
            }

            var checkPassword = await _userManager.CheckPasswordAsync(user, model.password);
            if (!checkPassword)
            {
                return BadRequest(new { error = "Дані вказано не вірно" });
            }

            string token = await _jwtTokenService.CreateToken(user);
            return Ok(new { token });
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.email);
            if (user != null)
            {
                return BadRequest(new ServiceResponse { Message = "Ви вже зареєстровані" });
            }

            user = new UserEntity
            {
                FirstName = model.FirstName,
                UserName = model.UserName,
                LastName = model.LastName,
                Email = model.email
            };
        

            var  res = await _userManager.CreateAsync(user, model.password);
            if (!res.Succeeded)
            {
                return BadRequest(new ServiceResponse { Message = "Виникла якась проблема" });
            }
            res = await _userManager.AddToRoleAsync(user, Roles.User);
            if (!res.Succeeded)
            {
                return BadRequest(new ServiceResponse { Message = "Виникла якась проблема" });
            }
            return Ok(new ServiceResponse { Message = "Реєстрація успішна" });
        }

        [HttpPost("GoogleExternalLogin")]
        public async Task<IActionResult> GoogleExternalLoginAsync([FromBody] ExternalLoginRequest request)
        {
            try
            {
                var payload = await _jwtTokenService.VerifyGoogleToken(request);
                if (payload == null)
                {
                    return BadRequest(new { error = "Щось пішло не так!" });
                }

                var info = new UserLoginInfo(request.Provider, payload.Subject, request.Provider);
                var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
                if (user == null)
                {
                    user = await _userManager.FindByEmailAsync(payload.Email);
                    if (user == null)
                    {
                        user = new UserEntity
                        {
                            Email = payload.Email,
                            UserName = payload.Email,
                            FirstName = payload.GivenName,
                            LastName = payload.FamilyName
                        };
                        var resultCreate = await _userManager.CreateAsync(user);
                        if (!resultCreate.Succeeded)
                        {
                            return BadRequest(new { error = "Помилка створення користувача" });
                        }
                    }

                    var resultLogin = await _userManager.AddLoginAsync(user, info);
                    if (!resultLogin.Succeeded)
                    {
                        return BadRequest(new { error = "Створення входу через гугл" });
                    }
                }

                string token = await _jwtTokenService.CreateToken(user);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}