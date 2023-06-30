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
    public class ProductImageVM
    {
        public int Id { get; set; }
        public int Priority { get; set; }
        public bool IsMainImage { get; set; }
        public string Image { get; set; }
    }
}
