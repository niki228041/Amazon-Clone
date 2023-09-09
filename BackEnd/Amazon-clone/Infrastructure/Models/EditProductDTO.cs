using DAL.Entities.DTO_s;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class EditProductDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Discount { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public bool IsInTheStock { get; set; }
        public int NumberOfDaysForDelivery { get; set; }
        public string Address { get; set; }
        public IList<ImageUploadDTO> Images_ { get; set; }
        public int CategoryId { get; set; }
        public List<VariantDTO> Variants_ { get; set; }
    }
}
