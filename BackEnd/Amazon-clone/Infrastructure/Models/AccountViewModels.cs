﻿using System;

namespace Infrastructure.Models
{
    public class LoginViewModel
    {
        public string email { get; set; }
        public string password { get; set; }
    }
    
    public class ExternalLoginRequest
    {
        public string Provider { get; set; }
        public string Token { get; set; }
    }
}
