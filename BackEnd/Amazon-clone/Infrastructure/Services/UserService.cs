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

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private IConfiguration _configuration;
        private EmailService _emailService;
        private IJwtTokenService _jwtService;
        private readonly IMapper _mapper;
        private TokenValidationParameters _tokenValidationParameters;


        public UserService(IUserRepository userRepository, IJwtTokenService jwtService, IConfiguration configuration, EmailService emailService, IMapper mapper, TokenValidationParameters tokenValidationParameters)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _jwtService = jwtService;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> RegisterUserAsync(RegisterViewModel model)
        {
            if (model == null)
            {
                throw new NullReferenceException("Register model is null.");
            }

            if (model.Password != model.CheckPassword)
            {
                return new ServiceResponse
                {
                    Message = "Confirm pssword do not match",
                    IsSuccess = false
                };
            }

            var newUser = _mapper.Map<RegisterViewModel, User>(model);

            var result = await _userRepository.RegisterUserAsync(newUser, model.Password);
            if (result.Succeeded)
            {
                var token = await _userRepository.GenerateEmailConfirmationTokenAsync(newUser);

                var encodedEmailToken = Encoding.UTF8.GetBytes(token);
                var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

                string url = $"{_configuration["HostSettings:URL"]}/api/User/confirmemail?userid={newUser.Id}&token={validEmailToken}";

                string emailBody = $"<h1>Confirm your email</h1> <a href='{url}'>Confirm now</a>";
                //await _emailService.SendEmailAsync(newUser.Email, "Email confirmation.", emailBody);


                var tokens = await _jwtService.CreateToken(newUser);

                return new ServiceResponse
                {
                    Message = "User successfully created.",
                    Payload= tokens,
                    IsSuccess = true
                };
            }
            else
            {
                return new ServiceResponse
                {
                    Message = "Error user not created.",
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
                    Message = "Login incorrect.",
                    IsSuccess = false
                };
            }

            var result = await _userRepository.ValidatePasswordAsync(model, model.password);
            if (!result)
            {
                return new ServiceResponse
                {
                    Message = "Password incorrect.",
                    IsSuccess = false
                };
            }

            var tokens = await _jwtService.CreateToken(user);

            return new ServiceResponse
            {
                Message = "Logged in successfully",
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
                    Message = "User not found"
                };

            var decodedToken = WebEncoders.Base64UrlDecode(token);
            string normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userRepository.ConfirmEmailAsync(user, normalToken);

            if (result.Succeeded)
                return new ServiceResponse
                {
                    Message = "Email confirmed successfully!",
                    IsSuccess = true,
                };

            return new ServiceResponse
            {
                IsSuccess = false,
                Message = "Email did not confirm",
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

    }
}

