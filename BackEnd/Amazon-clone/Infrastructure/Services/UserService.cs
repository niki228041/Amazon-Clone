using System;
using AutoMapper;
using DAL.Interfaces;
using Google.Apis.Auth.OAuth2.Requests;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Services;
using System.Text;
using Infrastructure.Models;
using DAL.Entities;
using LoginViewModel = DAL.Entities.LoginViewModel;
using Microsoft.Extensions.Configuration;
using SixLabors.ImageSharp.Formats.Webp;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.WebUtilities;
using DAL.Constants;
using System.Globalization;
using System.Resources;
using DAL.Repositories;
using DAL.Entities.Music;


namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private IConfiguration _configuration;
        private EmailService _emailService;
        private IJwtTokenService _jwtService;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;
        private TokenValidationParameters _tokenValidationParameters;
        

        public UserService(IUserRepository userRepository, IJwtTokenService jwtService, IConfiguration configuration, EmailService emailService, IMapper mapper, TokenValidationParameters tokenValidationParameters, IImageService imageService)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _jwtService = jwtService;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async Task<ServiceResponse> RegisterUserAsync(RegisterViewModel model)
        {
            if (model == null)
            {
                throw new NullReferenceException("Щось пішло не так");
            }

            if (model.Password != model.CheckPassword)
            {
                return new ServiceResponse
                {
                    Message = "Паролі не відповідають один одному",
                    IsSuccess = false
                };
            }

            var newUser = _mapper.Map<RegisterViewModel, User>(model);
            newUser.UserName = newUser.Email;

            var result = await _userRepository.RegisterUserAsync(newUser, model.Password);
            
            if (result.Succeeded)
            {
                await _userRepository.AddRoleAsync(newUser, Roles.User);

                var token = await _userRepository.GenerateEmailConfirmationTokenAsync(newUser);

                var encodedEmailToken = Encoding.UTF8.GetBytes(token);
                var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

                string url = $"{_configuration["HostSettings:URL"]}/api/User/confirmemail?userid={newUser.Id}&token={validEmailToken}";

                string emailBody = $"<h1>Confirm your email</h1> <a href='{url}'>Confirm now</a>";
                //await _emailService.SendEmailAsync(newUser.Email, "Email confirmation.", emailBody);


                var tokens = await _jwtService.CreateToken(newUser);

                return new ServiceResponse
                {
                    Message = "Користувача успішно створено!",
                    Payload= tokens,
                    IsSuccess = true
                };
            }
            else
            {
                var error = result.Errors.FirstOrDefault();
                var errorUA = "";

                switch(error.Code)
                {
                    case "PasswordTooShort":errorUA = "Пароль повиннен бути не менше чим 6 символів.";break;
                    case "DuplicateUserName": errorUA = "Користувач з таким ім'ям користувача вже існує, виберіть інший!";break;
                    default: errorUA = error.Code;break;
                }

                return new ServiceResponse
                {
                    Message = errorUA,
                    IsSuccess = false,
                    Errors = result.Errors.Select(e => e.Description)
                };
            }
        }

        public async Task<ServiceResponse> LoginUserAsync(LoginViewModel model)
        {
            var user = await _userRepository.LoginUserAsync(model);


            if (user == null)
            {
                return new ServiceResponse
                {
                    Message = "Немає користувача з такою електронною адресою.",
                    IsSuccess = false
                };
            }

            var result = await _userRepository.ValidatePasswordAsync(model, model.password);
            if (!result)
            {
                return new ServiceResponse
                {
                    Message = "Неправильний пароль.",
                    IsSuccess = false
                };
            }

            var tokens = await _jwtService.CreateToken(user);

            return new ServiceResponse
            {
                Message = "Аутентифікація пройшла успішно.",
                Payload= tokens,
                IsSuccess = true,
            };
        }

        public async Task<ServiceResponse> ConfirmEmailAsync(string userId, string token)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Користувач не знайдений."
                };

            var decodedToken = WebEncoders.Base64UrlDecode(token);
            string normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userRepository.ConfirmEmailAsync(user, normalToken);

            if (result.Succeeded)
                return new ServiceResponse
                {
                    Message = "Емайл був успішно підтвердженний!",
                    IsSuccess = true,
                };

            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Емайл не був підтвердженний.",
                Errors = result.Errors.Select(e => e.Description)
            };
        }

        public async Task<ServiceResponse> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            var usersVM = new List<AllUsersVM>();
            Console.WriteLine("Count Users = " + users.Count());
            foreach (var user in users)
            {
                var userVM = _mapper.Map<AllUsersVM>(user);
                //var roles = await _userRepository.GetRolesAsync(user);
                //userVM.Role = roles.First();
                usersVM.Add(userVM);
            }

            return new ServiceResponse
            {
                Message = "All users successfully loaded.",
                IsSuccess = true,
                Payload = usersVM
            };

        }

        public async Task<ServiceResponse> EditUserAsync(EditUserDTO model)
        {
            var oldUser = await _userRepository.GetUserByIdAsync(model.Id.ToString());
            var user = _mapper.Map(model, oldUser);


            if (user != null)
            {
                var mainImage = await _imageService.SaveImageAsync(model.AvatarImage, DirectoriesInProject.ProductImages);

                user.AvatarImage = mainImage;

                await _userRepository.UpdateUserAsync(user);
                return new ServiceResponse
                {
                    Message = "Користувач був успішно оновлений!",
                    IsSuccess = true,
                    Payload = "ok"
                };
            }

            return new ServiceResponse
            {
                Message = "Користувач не був успішно оновлений!",
                IsSuccess = false,
            };
        }

        public async Task<ServiceResponse> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id.ToString());

            if (user != null)
            {
                var userVM = _mapper.Map<User, AllUsersVM>(user);

                return new ServiceResponse()
                {
                    Payload = userVM,
                    Message = "Користувача знайдено",
                    IsSuccess = true,
                };
            }
            
            return new ServiceResponse()
            {
                Message = "Такого користувача не існує",
                IsSuccess = false,
            };
        }
    }
}

