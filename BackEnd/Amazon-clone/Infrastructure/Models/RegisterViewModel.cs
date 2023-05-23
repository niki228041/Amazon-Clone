namespace Infrastructure.Models;

public class RegisterViewModel
{
    public string email { get; set; }
    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string password { get; set; }
    public string CheckPassword { get; set; }
}