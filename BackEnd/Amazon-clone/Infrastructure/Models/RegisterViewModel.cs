﻿namespace Infrastructure.Models;

public class RegisterViewModel
{
    public string Email { get; set; }
    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Password { get; set; }
    public string CheckPassword { get; set; }
    public string AvatarImage { get; set; }
}