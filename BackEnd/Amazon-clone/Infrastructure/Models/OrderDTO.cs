using DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class OrderDTO
    {
        public string FullName { get; set; }
        public int? UserId { get; set; }
        public float Price { get; set; }
        public int? CardId { get; set; }
        public int? AddressId { get; set; }
        public ICollection<OrderedProductDTO> OrderedProducts_ { get; set; }
    }
}
