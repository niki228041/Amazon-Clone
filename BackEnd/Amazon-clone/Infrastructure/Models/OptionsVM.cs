using DAL.Entities.FilterEntities;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Models
{
    public class OptionsVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool isBaseOptions { get; set; }
        public List<VariantVM> Variants { get; set; }
    }
}
