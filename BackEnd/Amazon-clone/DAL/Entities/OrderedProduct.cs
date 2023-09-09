using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class OrderedProduct : BaseEntity<int>
    {
        public int Count { get; set; }
        public bool canLeaveComment { get; set; } = true;

        public bool isBought { get; set; } = false;

        //Every OrderedProduct have an order
        public Order Order { get; set; }

        [ForeignKey(nameof(Order))]
        public int? OrderId { get; set; }

        //Every OrderedProduct have an order
        public Product Product { get; set; }

        [ForeignKey(nameof(Product))]
        public int? ProductId { get; set; }
    }
}
