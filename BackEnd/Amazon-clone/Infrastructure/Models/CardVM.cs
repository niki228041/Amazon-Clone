using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class CardVM
    {
        public string Id { get; set; }
        public string OwnerName { get; set; }
        public string CardNumber { get; set; }
        public string Year { get; set; }
        public string Month { get; set; }
        public bool IsDefault { get; set; }
    }
}
