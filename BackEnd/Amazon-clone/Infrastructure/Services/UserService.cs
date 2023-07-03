﻿using System;
using AutoMapper;
using DAL.Interfaces;
using Google.Apis.Auth.OAuth2.Requests;
using Microsoft.AspNetCore.WebUtilities;
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

namespace Infrastructure.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;
        private IConfiguration _configuration;
        private JwtTokenService _jwtService;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, JwtTokenService jwtService, IConfiguration configuration, IMapper mapper)
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

            if (model.password != model.CheckPassword)
            {
                return new ServiceResponse
                {
                    Message = "Confirm pssword do not match",
                    IsSuccess = false
                };
            }

            var newUser = _mapper.Map<RegisterViewModel, User>(model);

            var result = await _userRepository.RegisterUserAsync(newUser, model.password);
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
                IsSuccess = true,
            };
        }

        public async Task<ServiceResponse> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            var usersVM = new List<AllUsersVM>();

            foreach (var user in users)
            {
                var userVM = _mapper.Map<AllUsersVM>(user);
                var roles = await _userRepository.GetRolesAsync(user);
                userVM.Role = roles.First();
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
