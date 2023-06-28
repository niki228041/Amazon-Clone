using System;
using DAL.Entities;
using Infrastructure.Models;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Interfaces
{
	public interface IUserService
	{
        Task<IdentityResult> RegisterUserAsync(User model, string password);
        Task<User> LoginUserAsync(LoginViewModel model);
        Task<bool> ValidatePasswordAsync(LoginViewModel model, string password);
        Task<string> GenerateEmailConfirmationTokenAsync(User appUser);
        Task<User> GetUserByIdAsync(string id);
        Task<IList<string>> GetRolesAsync(User model);
        Task<User> GetUserByEmailAsync(string email);
        Task<IdentityResult> ConfirmEmailAsync(User model, string token);
        Task<string> GeneratePasswordResetTokenAsync(User model);
        Task<IdentityResult> ResetPasswordAsync(User model, string token, string password);
        Task SaveRefreshTokenAsync(RefreshToken refreshToken);
        Task<RefreshToken> CheckRefreshTokenAsync(string refreshToken);
        Task UpdateRefreshTokenAsync(RefreshToken refreshToken);
        Task<List<User>> GetAllUsersAsync();
    }
}

