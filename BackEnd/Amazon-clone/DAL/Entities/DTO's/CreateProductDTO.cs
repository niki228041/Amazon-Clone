using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities.DTO_s
{
    public class CreateProductDTO
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public int Discount { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public bool IsInTheStock { get; set; }
        public int NumberOfDaysForDelivery { get; set; }
        public string Address { get; set; }
        public IList<ProductImageUploadDTO> Images_ { get; set; }
        public int CategoryId { get; set; }
    }
}
