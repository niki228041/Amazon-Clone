using Microsoft.AspNetCore.Http;

namespace Infrastructure.Models
{
    public class CategoryUploadImageViewModel
    {
        public IFormFile Image { get; set; }
    }
}
