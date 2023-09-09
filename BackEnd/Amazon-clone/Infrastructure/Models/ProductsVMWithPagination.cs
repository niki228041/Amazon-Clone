using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class ProductsVMWithPagination
    {
        public int CountOfProducts { get; set; }
        public List<ProductVM> Products { get; set; }
    }
}
