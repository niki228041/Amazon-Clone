using DAL.Entities;
using DAL.Entities.Identity;
using DAL.Validation;
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
using System.Net;
using System.Net.Mail;
using MailKit;
using MailKit.Security;
using MimeKit;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Util.Store;

namespace ShopApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IJwtTokenService _jwtTokenService;
        private IUserService _userService;
        private static string[] Scopes = { GmailService.Scope.GmailSend };
        private static string ApplicationName = "Amazone-Clone";
        private static IConfiguration _configuration;

        public AccountController(UserManager<User> userManager,
            IJwtTokenService jwtTokenService, IUserService userService, IConfiguration configuration)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
            _userService = userService;
            _configuration = configuration;
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
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordVM forgotPasswordVM) // тільки емейл
        {
            //string server = "smtp.gmail.com"; // sets the server address
            //int port = 587; // int.Parse(ConfigurationManager.AppSettings["gmail_port"]); //sets the server port

            var server = _configuration.GetValue<string>("EmailSettings:SMTP");
            var port = _configuration.GetValue<int>("EmailSettings:PORT");

            var username = _configuration.GetValue<string>("EmailSettings:User");
            var password = _configuration.GetValue<string>("EmailSettings:Password");
            
            var user = await _userManager.FindByEmailAsync(forgotPasswordVM.Email);
            if (user == null)
                return BadRequest("Користувача не існує");
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var frontEndURL = _configuration.GetValue<string>("FrontEndURL");

            var callbackUrl =
                $"{frontEndURL}/resetpassword?userId={user.Id}&" +
                $"code={WebUtility.UrlEncode(token)}";

            //Url.Action(nameof(ResetPassword), "AccountController", new { token, email = user.Email }, Request.Scheme);
            //var message1 = new Message(new string[] { forgotPasswordVM.Email }, "Reset password token",
            //    $"Please reset password by clicking here: " +
            //   $"<a href='{callbackUrl}'>Відновити</a>");
            //_emailSender.SendEmail(message1);
            string to = forgotPasswordVM.Email;
            string subject = "Reset password token";
            string message = $"Please reset password by clicking here: " + $"<a href='{callbackUrl}'>Відновити</a>";
            //var sendMessage = new Message(to, subject, message);
            MailMessage mailMessage = new MailMessage(username, to, subject, message);
            mailMessage.Priority = MailPriority.High;
            mailMessage.IsBodyHtml = true;
            SmtpClient client = new SmtpClient(server, port);
            client.EnableSsl = true;
            client.Credentials = new NetworkCredential(username, password);

            client.SendAsync(mailMessage, token);

            return Ok();
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ResetPasswordVM model) // айді юзера, токен, пароль
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            var res = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            return Ok();
        }


    //    <div onClick = { () => navigate("#") } >
    //    <img className = "headerLogo" src={logo
    //} />
    //  </div>

    }   
}