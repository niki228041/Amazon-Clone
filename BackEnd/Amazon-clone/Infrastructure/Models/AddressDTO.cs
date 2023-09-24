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
    public class AddressDTO
    {
        public string Street { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string FullName { get; set; }
        public string Country { get; set; }
        public string Postcode { get; set; }
        public bool IsDefault { get; set; }
        public int UserId { get; set; }
    }
}
