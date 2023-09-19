using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class AddressVM
    {
        public string Street { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string FullName { get; set; }
        public string Country { get; set; }
        public string Postcode { get; set; }
        //public int? OrderId { get; set; }
        public int UserId { get; set; }
    }
}
