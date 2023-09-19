using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class OrdersWithPagination
    {
        public List<OrderVM> Orders { get; set; }
        public int Total { get; set; }
    }
}
