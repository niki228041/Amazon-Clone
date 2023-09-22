using System;
using DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Infrastructure.Models;

namespace DAL.Interfaces
{
	public interface IUserRepository
	{
        Task<IdentityResult> RegisterUserAsync(User model, string password);
        Task<User> LoginUserAsync(LoginViewModel model);
        Task<bool> ValidatePasswordAsync(LoginViewModel model, string password);
        Task<User> GetUserByIdAsync(string id);
        Task<User> UpdateUserAsync(User model);
        Task<User> GetUserByEmailAsync(string email);
        Task<IList<string>> GetRolesAsync(User model);
        Task<IdentityResult> ConfirmEmailAsync(User model, string token);
        Task<string> GeneratePasswordResetTokenAsync(User model);
        Task<string> GenerateEmailConfirmationTokenAsync(User appUser);
        Task<List<User>> GetAllUsersAsync();
        Task<User> AddRoleAsync(User model,string role);
       
    }
}

