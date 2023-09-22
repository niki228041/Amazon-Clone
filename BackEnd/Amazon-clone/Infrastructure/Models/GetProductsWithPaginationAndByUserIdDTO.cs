using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class GetProductsWithPaginationAndByUserIdDTO
    {
        public int Id { get; set; }
        public int Page { get; set; }
        public int Limit { get; set; }
    }
}
