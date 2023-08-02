using DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class OrderVM
    {
        public string FullName { get; set; }
        public int? UserId { get; set; }
        public int? CardId { get; set; }
        public int? AddressId { get; set; }
        public ICollection<OrderedProductVM> Products { get; set; }
    }
}
