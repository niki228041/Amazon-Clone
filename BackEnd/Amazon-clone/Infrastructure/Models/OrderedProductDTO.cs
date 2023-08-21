using DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class OrderedProductDTO
    {
        public int ProductId { get; set; }
        public int Count { get; set; }
    }
}
