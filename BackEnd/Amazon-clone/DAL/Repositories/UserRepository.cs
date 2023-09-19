using System;
using DAL.Entities;
using DAL.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class UserRepository :  IUserRepository
    {
        
        private readonly UserManager<User> _userManager;

        public UserRepository(UserManager<User> userManager) 
        {
            _userManager = userManager;
        }

        public async Task<User> LoginUserAsync(LoginViewModel model)
        {
            var result = await _userManager.FindByEmailAsync(model.email);
            return result;
        }

        public async Task<IdentityResult> RegisterUserAsync(User model, string password)
        {
            var result = await _userManager.CreateAsync(model, password);
            return result;
        }

        public async Task<bool> ValidatePasswordAsync(LoginViewModel model, string password)
        {
            var user = await _userManager.FindByEmailAsync(model.email);
            var result = await _userManager.CheckPasswordAsync(user, password);
            return result;
        }

        public async Task<string> GenerateEmailConfirmationTokenAsync(User appUser)
        {
            var result = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
            return result;
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            var result = await _userManager.FindByIdAsync(id);
            return result;
        }

        public async Task<IdentityResult> ConfirmEmailAsync(User model, string token)
        {
            var result = await _userManager.ConfirmEmailAsync(model, token);
            return result;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var result = await _userManager.FindByEmailAsync(email);
            return result;
        }

        public async Task<string> GeneratePasswordResetTokenAsync(User model)
        {
            var result = await _userManager.GeneratePasswordResetTokenAsync(model);
            return result;
        }

        async Task<IList<string>> IUserRepository.GetRolesAsync(User model)
        {
            var result = await _userManager.GetRolesAsync(model);
            return result;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            var result = await _userManager.Users.ToListAsync();
            return result;
        }

        public async Task<User> UpdateUserAsync(User model)
        {
            await _userManager.UpdateAsync(model);
            return model;
        }
        

        public async Task<User> AddRoleAsync(User model,string role)
        {
            await _userManager.AddToRoleAsync(model, role);
            return model;
        }

       
    }
}

