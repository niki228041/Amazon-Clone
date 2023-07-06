using DAL.Entities;
using DAL.Entities.Identity;
using DAL.Validation;
using Google.Apis.Auth.OAuth2.Requests;
using Infrastructure.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Services;
using ShopApi.Constants;
using Infrastructure.Services;
using ExternalLoginRequest = DAL.Entities.ExternalLoginRequest;
using LoginViewModel = DAL.Entities.LoginViewModel;
using Infrastructure.Interfaces;
using System.Net.Mail;
using System.Net;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
        private IUserService _userService;

        public AccountController(UserManager<User> userManager,
            IJwtTokenService jwtTokenService, IUserService userService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginUserAsync([FromBody] LoginViewModel model)
        {
            var validator = new LoginUserValidation();
            var validationResult = validator.Validate(model);
            if (validationResult.IsValid)
            {
                var result = await _userService.LoginUserAsync(model);
                return Ok(result);
            }
            else
            {
                return BadRequest(validationResult.Errors);
            }

        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);
            var resp = await _userService.RegisterUserAsync(model);

            if (user != null)
            {
                return BadRequest(new ServiceResponse { Message = "Ви вже зареєстровані" });
            }



            if (!resp.IsSuccess)
            {
                return BadRequest(new ServiceResponse { Message = "Виникла якась проблема" });
            }

            return Ok(resp);
        }

        [AllowAnonymous]
        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmailAsync(string userId, string token)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(token))
                return NotFound();

            var result = await _userService.ConfirmEmailAsync(userId, token);

            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            var result = await _userService.GetAllUsersAsync();
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
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
                        user = new User
                        {
                            FirstName = payload.GivenName,
                            LastName = payload.FamilyName,
                            Email = payload.Email

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

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordVM model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return NotFound();
            }

            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            var callbackUrl = Url.Action("ResetPassword", "Account", new { email = user.Email, code = resetToken }, Request.Scheme);

            var smtpHost = "smtp.example.com";
            var smtpPort = 587;
            var smtpUsername = "amazoneclone0@gmail.com";
            var smtpPassword = "123456Qwe_";

            using (var smtpClient = new SmtpClient(smtpHost, smtpPort))
            {
                smtpClient.EnableSsl = true;
                smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);

                var from = new MailAddress("amazoneclone0@gmail.com", "Amazone Clone");
                var to = new MailAddress(user.Email);
                var subject = "Reset Your Password";
                var body = $"Please reset your password by clicking the link: {callbackUrl}";

                using (var mailMessage = new MailMessage(from, to))
                {
                    mailMessage.Subject = subject;
                    mailMessage.Body = body;
                    mailMessage.IsBodyHtml = true;

                    try
                    {
                        smtpClient.Send(mailMessage);
                    }
                    catch (SmtpException ex)
                    {
                        return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
                    }
                }
            }
            return Ok();
        }

    }
}