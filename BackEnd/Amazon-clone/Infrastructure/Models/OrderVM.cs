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
        public string UserName { get; set; }
        public float Price { get; set; }
        public int? UserId { get; set; }
        public int Id { get; set; }
        public bool isBought { get; set; }
        public int? CardId { get; set; }
        public int? AddressId { get; set; }
        public AddressVM Address { get; set; }
        public CardVM Card { get; set; }
        public DateTime DateCreated { get; set; }
        public ICollection<OrderedProductUpdatedVM> Products { get; set; }
    }
}
