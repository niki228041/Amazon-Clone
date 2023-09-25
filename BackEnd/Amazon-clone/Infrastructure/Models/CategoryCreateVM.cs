
using DAL.Entities.DTO_s;

namespace Infrastructure.Models.Caterories
{
    public class CategoryCreateVM
    {
        public string Name { get; set; }
        public List<int> OptionsIds { get; set; }
        //public string ImageBase64 { get; set; }
        public int CategoryId { get; set; }
        public IList<ImageUploadDTO> Images_ { get; set; }
    }
}