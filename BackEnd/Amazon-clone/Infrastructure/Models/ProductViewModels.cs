using Microsoft.AspNetCore.Http;

namespace Infrastructure.Models
{
    public class ProductUploadImageViewModel
    {
        public IFormFile Image { get; set; }
    }
}
