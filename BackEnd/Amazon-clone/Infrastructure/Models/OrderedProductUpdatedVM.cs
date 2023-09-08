using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class OrderedProductUpdatedVM
    {
        public int Id { get; set; }
        public int Count { get; set; }
        public bool isBought { get; set; }
        public int? ProductId { get; set; }
        public ProductVM Product { get; set; }
    }
}
