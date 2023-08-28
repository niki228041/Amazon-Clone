using DAL.Entities.FilterEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class FilterVM
    {
        public int CategoryId { get; set; }
        public int Min_Preis { get; set; }
        public int Max_Preis { get; set; }
        public int Stars { get; set; }
        public string ProductName { get; set; }
        public string SortBy { get; set; }
        public List<VariantDTO> Variants { get; set; }
        public int Page { get; set; }
        public int Limit { get; set; }
    }
}
