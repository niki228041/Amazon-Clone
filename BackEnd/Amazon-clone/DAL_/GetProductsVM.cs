using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL_
{
    public class GetProductsVM
    {
        public int pageNumber { get; set; }
        public int pageSize { get; set; }
        public string Category { get; set; }
        public string? Find { get; set; }
    }
}
